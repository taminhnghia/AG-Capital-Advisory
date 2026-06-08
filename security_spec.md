# Firebase Security Specification (`security_spec.md`)

This document defines the security rules, invariants, threat models ("Dirty Dozen" payloads), and test assertions for the AG Capital Advisory Firebase backend.

## 1. Data Invariants

1. **Deal Submissions (`/dealSubmissions/{id}`)**
   - Anyone can write a submission, but it must include all required fields (`fullName`, `jobTitle`, `companyName`, `businessEmail`, `capitalSought`, `revenueSummary`, `useOfFunds`, `businessDescription`, `timestamp`).
   - Fields cannot be excessively large to prevent resource exhaustion attacks.
   - The submittal cannot be modified after creation (immutable records).
   - Only admin users or standard corporate representatives can read submissions.

2. **Contact Enquiries (`/contactEnquiries/{id}`)**
   - Anyone can submit a contact inquiry.
   - Required fields (`fullName`, `company`, `jobTitle`, `email`, `purpose`, `message`, `timestamp`) must always exist on create.
   - Immutable records: Nobody can update these documents once submitted.

3. **Governance Diagnostics (`/governanceDiagnostics/{id}`)**
   - Scoring integers must be within the bound `[1, 5]`.
   - Percentage must equal the average scorecard percentage calculation.
   - Immutable records: Cannot be modified once calculated and stored.

4. **Newsletter Subscribers (`/newsletterSubscribers/{id}`)**
   - Email format must be verified as a valid schema.
   - Check if document already exists to avoid duplicate opt-ins.

---

## 2. The "Dirty Dozen" Payloads

Here are twelve highly malicious payloads designed to attempt to compromise data integrity, bypass locks, verify claims, or trigger database exhaustion:

### Payload 1: Shadow Update Privilege Escalation
An attacker tries to update a submitted deal, pretending to add super admin rights or toggle verification flags.
```json
{
  "isAdmin": true,
  "role": "Super Admin",
  "fullName": "Malicious Attacker"
}
```

### Payload 2: Massive Payload "Denial of Wallet" Attack
An attacker submits a deal with a massive description of 10MB to exhaust storage and billing quotas.
```json
{
  "fullName": "Attacker",
  "businessDescription": "[10 Megabytes of random junk characters...]"
}
```

### Payload 3: Invalid Range Scores
An attacker injects an illegal governance score outside of the strict 1-5 domain.
```json
{
  "scores": {
    "ownershipClarity": 99,
    "leadershipAccountability": -5
  }
}
```

### Payload 4: Invalid Percentage Math Map Spoofing
An attacker attempts to write a diagnostic scorecard with an incorrect percentage sum.
```json
{
  "percentage": 1000,
  "scores": {
    "ownershipClarity": 1,
    "leadershipAccountability": 1
  }
}
```

### Payload 5: ID Character Poisoning (Directory Traversal)
An attacker uses an ID with path-directed traversal characters to read other records.
```json
{
  "id": "../../../otherUserRecord"
}
```

### Payload 6: Spoofed Email Identity
An attacker attempts to inject a different email as the creator than their authenticated token email.
```json
{
  "email": "victim_email@corporation.com"
}
```

### Payload 7: Client-Delegated Query Harvesting
An attacker attempts to perform a query list operation on `/dealSubmissions` without being authenticated.
```json
{}
```

### Payload 8: Mutating Immutable Records
An attacker attempts to write an update to a contact enquiry or newsletter subscriber that was already recorded.
```json
{
  "message": "Mutated text"
}
```

### Payload 9: Invalid Email Format Infiltration
Attempt to write invalid or broken characters in the newsletter subscription collection.
```json
{
  "email": "not-an-email"
}
```

### Payload 10: Unauthorized Delete Operations
An attacker attempts to delete submissions or enquiries made by customers.
```json
{}
```

### Payload 11: Spoofed Server Timestamp
An attacker sends a client-local computer timestamp instead of utilizing the database's strict `request.time`.
```json
{
  "timestamp": "2050-12-31T23:59:59Z"
}
```

### Payload 12: Orphaned Sub-Resource Injection
An attacker tries to create nested paths bypassing parent document existence controls.
```json
{}
```

---

## 3. Test Runner Configuration (Reference)

```typescript
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

describe("AG Capital Advisory Security Rules Unit Tests", () => {
  let testEnv;

  before(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "triple-bonbon-w8gvj",
      firestore: {
        rules: require('fs').readFileSync('firestore.rules', 'utf8')
      }
    });
  });

  it("should block unauthenticated updates on dealSubmissions (Payload 1)", async () => {
    const context = testEnv.unauthenticatedContext();
    const docRef = context.firestore().collection("dealSubmissions").doc("some-id");
    await assertFails(docRef.update({ isAdmin: true }));
  });
});
```
