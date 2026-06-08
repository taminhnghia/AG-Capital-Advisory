/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from './types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  EN: {
    // Header & Navigation
    NAV_HOME: 'Home',
    NAV_ABOUT: 'About',
    NAV_SERVICES: 'Services',
    NAV_GOVERNANCE: 'Governance Advisory',
    NAV_INDUSTRIES: 'Industries',
    NAV_PROCESS: 'Our Process',
    NAV_INSIGHTS: 'Insights',
    NAV_FOUNDERS: 'For Founders',
    NAV_CONTACT: 'Contact',
    NAV_ALIGNMENT: 'Alignment Model',
    BTN_SUBMIT_DEAL: 'Submit Your Deal',
    BTN_BOOK_DISCUSSION: 'Book a Confidential Discussion',
    MANAGED_BY: 'Managed by AG Invest',
    THINK_FORWARD: 'THINK FORWARD',
    BEYOND_ROUND: 'Beyond the round.',

    // Hero Section
    HERO_BADGE: 'MANAGED BY AG INVEST',
    HERO_TITLE: 'Capital & Governance Advisory for Ambitious Consumer Businesses',
    HERO_DESC: 'We help Vietnamese consumer businesses strengthen governance, prepare for investment, access strategic capital and create lasting value beyond the funding round.',
    HERO_CTA_PRIMARY: 'Submit Your Deal',
    HERO_CTA_SECONDARY: 'Explore Our Services',
    HERO_SUBTEXT: 'Focused on FMCG, retail, F&B, consumer technology and e-commerce in Vietnam.',

    // Trust Statement
    TRUST_TITLE: 'Good Capital Begins With Good Governance.',
    TRUST_DESC: 'Capital alone does not build lasting businesses. AG Capital Advisory combines investment readiness, disciplined deal preparation, strategic investor access and post-investment support to help consumer businesses grow with structure and clarity. Lasting value begins beyond the round.',

    // Home - Service Architecture
    SERV_TITLE: 'Advisory Across the Capital Journey',
    SERV_SUBTITLE: 'From readiness to capital access, from transaction support to long-term value creation.',
    SERV_LEARN_MORE: 'Learn More',

    // Core Services
    SERV_1_TITLE: 'Fundraising Strategy',
    SERV_1_DESC: 'Pre-Seed to Series A: needs assessment, funding roadmap, valuation thinking, round structure, and dilution analysis.',
    SERV_2_TITLE: 'Growth Equity Advisory',
    SERV_2_DESC: 'Series B-C-D: preferred shares, secondary sale, liquidation preference, and exit planning with growth equity/PE funds.',
    SERV_3_TITLE: 'M&A Advisory',
    SERV_3_DESC: 'Buy-side and sell-side representation: independent valuation, due diligence coordination, transaction structuring, and negotiation support.',
    SERV_4_TITLE: 'Corporate Governance Advisory',
    SERV_4_DESC: 'Readiness assessment, cap table cleanup, governance structure, decision rights, and reporting frameworks.',
    SERV_5_TITLE: 'Investor-Ready Materials',
    SERV_5_DESC: 'Premium pitch deck, teaser, Information Memorandum, dynamic financial model, valuation analysis, and data room blueprinting.',
    SERV_6_TITLE: 'Investor Access',
    SERV_6_DESC: 'Target investor list curation, appetite matching, selective outreach coordination, and partner-led meeting preparation.',
    SERV_7_TITLE: 'DD & Transaction Support',
    SERV_7_DESC: 'Virtual data room supervision, term sheet commercial review, due diligence query tracking, and transactional coordination.',
    SERV_8_TITLE: 'Beyond-the-Round Value',
    SERV_8_DESC: 'Investor relations, use-of-funds efficiency tracking, governance review logs, and subsequent round roadmap design.',

    // Industries
    IND_TITLE: "Focused on Vietnam's Consumer Economy",
    IND_DESC: 'We work with businesses where brand strength, distribution capability, operating discipline and consumer insight define long-term value.',
    IND_1_TITLE: 'FMCG',
    IND_1_SUB: 'Packaged food, beverages, household and personal care brands.',
    IND_2_TITLE: 'Retail',
    IND_2_SUB: 'Retail chains, specialised retail and direct-to-consumer models.',
    IND_3_TITLE: 'F&B',
    IND_3_SUB: 'Food, beverage, restaurant, café and scalable service concepts.',
    IND_4_TITLE: 'Consumer Tech',
    IND_4_SUB: 'Technology platforms serving consumer behaviour and commerce.',
    IND_5_TITLE: 'E-commerce',
    IND_5_SUB: 'Digital-first consumer brands and omnichannel commerce models.',

    // Why AG Capital
    WHY_TITLE: 'Why AG Capital Advisory',
    WHY_1_TITLE: 'Consumer-Sector Depth',
    WHY_1_DESC: 'A focused understanding of Vietnamese consumer businesses, from brand and distribution to scale and margin discipline.',
    WHY_2_TITLE: 'Selective Boutique Model',
    WHY_2_DESC: 'We do not pursue every deal. Each selected engagement receives senior attention and structured execution.',
    WHY_3_TITLE: 'Governance Before Capital',
    WHY_3_DESC: 'Investor readiness starts with ownership clarity, reporting discipline and decision-making structure.',
    WHY_4_TITLE: 'Long-Term Alignment',
    WHY_4_DESC: 'For selected engagements, part of the success fee may be converted into equity-related interests, aligning value creation beyond the transaction.',
    WHY_QUOTE: '“We select carefully, prepare rigorously and stay aligned beyond the round.”',

    // Process section
    PROC_TITLE: 'A Structured Advisory Journey',
    PROC_SUBTITLE: 'We maintain strict confidentiality, screen for alignment early, and map a rigorous course to close.',
    PROC_DISCLAIMER_NOTE: 'Every engagement is subject to fit assessment and formal agreement.',

    // Alignment Model
    ALIGN_TITLE: 'A Model Built Around Commitment and Alignment',
    ALIGN_SUBTITLE: 'Our commercial structure aligns our success with your long-term value creation.',
    ALIGN_1_TITLE: 'Professional Commitment',
    ALIGN_1_SUB: 'Retainer',
    ALIGN_1_DESC: 'A recurring advisory fee supporting structured preparation, dedicated resources and disciplined execution.',
    ALIGN_2_TITLE: 'Outcome-Linked Compensation',
    ALIGN_2_SUB: 'Success Fee',
    ALIGN_2_DESC: 'A success fee payable upon actual capital disbursement, according to the agreed transaction terms.',
    ALIGN_3_TITLE: 'Long-Term Alignment',
    ALIGN_3_SUB: 'Fee-into-Equity',
    ALIGN_3_DESC: 'For selected engagements, an agreed portion of the success fee may be converted into equity, warrants or SAFE instruments, subject to agreement and professional review.',
    ALIGN_FOOTNOTE: 'Important Note: During its first operating year, AG Capital Advisory does not provide cash co-investment into client companies. Any long-term alignment is considered only through agreed Fee-into-Equity structures.',

    // Founder Fit Checklist
    FIT_TITLE: 'Is Your Business Ready for Strategic Capital?',
    FIT_Q1: 'Are you operating in a consumer-focused sector in Vietnam?',
    FIT_Q2: 'Do you already have market traction, revenue or meaningful user growth?',
    FIT_Q3: 'Is your capital need tied to a clear growth plan?',
    FIT_Q4: 'Is your ownership structure reasonably clear?',
    FIT_Q5: 'Are the founders prepared to share transparent business information?',
    FIT_Q6: 'Are you looking for a disciplined advisory partner, not a quick introduction service?',
    FIT_CTA: 'Start a Confidential Assessment',
    FIT_SECONDARY: 'View Founder Resources',

    // Insights Preview
    INSIGHTS_TITLE: 'Insights for Founders and Growth Businesses',
    INSIGHTS_CTA: 'Explore All Insights',

    // Final Homepage CTA
    FINAL_CTA_TITLE: 'Preparing for capital begins before the first investor meeting.',
    FINAL_CTA_DESC: 'Share your fundraising objective or governance challenge with AG Capital Advisory through a confidential initial discussion.',

    // Footer lines
    FOOTER_SHORT_DESC: 'Boutique capital and governance advisory for ambitious consumer businesses in Vietnam.',
    FOOTER_RIGHTS: 'All rights reserved.',
    FOOTER_LOCATION_LABEL: '285 Cach Mang Thang Tam Street, Hoa Hung Ward, Ho Chi Minh City.',
    FOOTER_CONTACT: 'Contact Us',
    FOOTER_SERVICES: 'Services',
    FOOTER_COMPANY: 'Company',
    FOOTER_LEGAL: 'Legal',

    // Legal links
    PRIVACY_POLICY: 'Privacy Policy',
    TERMS_OF_USE: 'Terms of Use',
    ADVISORY_DISCLAIMER: 'Advisory Disclaimer',
    CONFIDENTIALITY_NOTICE: 'Confidentiality Notice',

    // General Words
    BACK_TO_HOME: 'Back to Home',
    SUBMIT: 'Submit',
    SUCCESS: 'Success',
    SUBMIT_INQUIRY: 'Submit Confidential Enquiry',
    SEND_MESSAGE: 'Send Message',
    BOOK_MEETING: 'Request a Meeting',
    LEARN_MORE: 'Learn More',
    GET_IN_TOUCH: 'Get in Touch',
    READ_ARTICLE: 'Read Article',
    EST_READING_TIME: 'min read',
    CATEGORY: 'Category',
    MODAL_BOOK_BADGE: 'RELIABLE OUTREACH',
    MODAL_BOOK_TITLE: 'Schedule Private Advisory Call',
    MODAL_SUBMIT_BADGE: 'SECURED REGISTRY',
    MODAL_SUBMIT_TITLE: 'Submit Your Confidential Deal',
    MODAL_SUBMIT_SUB: 'Submit initial indicators using our secured database. High-fit opportunities receive partner-led analysis.',
  },
  VI: {
    // Header & Navigation
    NAV_HOME: 'Trang chủ',
    NAV_ABOUT: 'Về AG Capital',
    NAV_SERVICES: 'Dịch vụ',
    NAV_GOVERNANCE: 'Tư vấn Quản trị',
    NAV_INDUSTRIES: 'Lĩnh vực Trọng điểm',
    NAV_PROCESS: 'Quy trình Làm việc',
    NAV_INSIGHTS: 'Góc nhìn Chuyên gia',
    NAV_FOUNDERS: 'Dành cho Nhà sáng lập',
    NAV_CONTACT: 'Liên hệ',
    NAV_ALIGNMENT: 'Mô hình Đồng hành (Alignment)',
    BTN_SUBMIT_DEAL: 'Nộp Hồ Sơ Gọi Vốn',
    BTN_BOOK_DISCUSSION: 'Yêu cầu Tư vấn Bảo mật',
    MANAGED_BY: 'Thuộc hệ sinh thái AG Invest',
    THINK_FORWARD: 'TẦM NHÌN DÀI HẠN',
    BEYOND_ROUND: 'Vượt trên kỳ gọi vốn.',

    // Hero Section
    HERO_BADGE: 'THUỘC HỆ SINH THÁI AG INVEST',
    HERO_TITLE: 'Tư vấn Tài chính & Chuẩn hóa Quản trị cho Doanh nghiệp Tiêu dùng tăng trưởng',
    HERO_DESC: 'Chúng tôi đồng hành cùng các doanh nghiệp tiêu dùng Việt Nam nâng cao năng lực quản trị hiệu quả, cấu trúc dòng vốn tối ưu, sẵn sàng vượt qua các vòng thẩm định gắt gao của các quỹ PE/VC quốc tế.',
    HERO_CTA_PRIMARY: 'Nộp Hồ Sơ Gọi Vốn',
    HERO_CTA_SECONDARY: 'Giải pháp của Chúng tôi',
    HERO_SUBTEXT: 'Trọng tâm vào FMCG, Chuỗi bán lẻ, F&B, Công nghệ tiêu dùng và Thương mại điện tử thị trường Việt Nam.',

    // Trust Statement
    TRUST_TITLE: 'Dòng vốn bền bỉ bắt đầu từ hệ thống quản trị vững vàng.',
    TRUST_DESC: 'Chỉ riêng tiền vốn không thể tạo nên một thương hiệu trường tồn. AG Capital mang đến sự kết hợp toàn diện giữa tư duy thiết lập cấu trúc gọi vốn, kỷ luật quản trị, khả năng tiếp cận mạng lưới đầu tư chiến lược toàn cầu và sự đồng hành hậu thương vụ nhằm giúp doanh nghiệp bứt phá quy mô một cách bài bản nhất. Giá trị đích thực nằm ở chặng đường sau kỳ gọi vốn.',

    // Home - Service Architecture
    SERV_TITLE: 'Giải pháp Toàn diện Hành trình Gọi vốn',
    SERV_SUBTITLE: 'Từ hoàn thiện năng lực tổ chức, xây dựng hồ sơ chuẩn định chế, kết nối vốn đến tối ưu hóa giá trị sau thương vụ.',
    SERV_LEARN_MORE: 'Chi tiết Dịch vụ',

    // Core Services
    SERV_1_TITLE: 'Chiến dịch Gọi vốn (Fundraising)',
    SERV_1_DESC: 'Từ giai đoạn Sơ khởi đến Series A: Đánh giá nhu cầu đầu tư, hoạch định lộ trình huy động vốn, tối ưu hoá định giá doanh nghiệp, thiết kế cấu trúc vòng gọi vốn và kiểm soát tỷ lệ pha loãng.',
    SERV_2_TITLE: 'Tư vấn Vốn tăng trưởng (Growth Equity)',
    SERV_2_DESC: 'Giai đoạn Series B-C-D: Thiết kế điều khoản cổ phần ưu đãi (preferred shares), thực thi giao dịch bán thứ cấp (secondary transaction), tối ưu hóa thứ tự ưu tiên thanh lý (liquidation preference) và lập lộ trình thoái vốn bảo toàn giá trị.',
    SERV_3_TITLE: 'Tư vấn M&A chuyên sâu',
    SERV_3_DESC: 'Đại diện độc quyền bên mua hoặc bên bán (buy-side / sell-side): Định giá độc lập, điều phối rà soát đặc biệt (Due Diligence), cấu trúc hóa giao dịch tài chính và đồng hành đàm phán thương thảo thương vụ.',
    SERV_4_TITLE: 'Chuẩn hóa Thể chế Quản trị Doanh nghiệp',
    SERV_4_DESC: 'Đánh giá tính sẵn sàng thu hút đầu tư, chuẩn hóa cơ cấu sở hữu (Cap Table), kiện toàn bộ máy quản trị, phân cấp thẩm quyền ra quyết định (RACI) và thiết lập hệ thống báo cáo kiểm soát rủi ro.',
    SERV_5_TITLE: 'Xây dựng Hồ sơ Tài liệu Gọi vốn Chuẩn mực',
    SERV_5_DESC: 'Thiết kế Bản giới thiệu dự án (Pitch Deck) thẩm mỹ cao, soạn thảo Bản thông tin sơ lược (Teaser), lập Bản giới thiệu chi tiết (IM), xây dựng mô hình tài chính động dự báo 5 năm và kiến thiết phòng dữ liệu bảo mật (Data Room).',
    SERV_6_TITLE: 'Phát triển Quan hệ Nhà đầu tư',
    SERV_6_DESC: 'Xây dựng danh sách nhà đầu tư mục tiêu phù hợp, đối chiếu khẩu vị đầu tư thực tế, thiết lập các kênh tiếp xúc gián tiếp kín kẽ và huấn luyện kỹ năng thuyết trình thuyết phục.',
    SERV_7_TITLE: 'Hỗ trợ Hoàn tất Thương vụ (DD & Transaction)',
    SERV_7_DESC: 'Giám sát vận hành phòng dữ liệu số riêng biệt (VDR), thương thảo điều khoản thương mại trong bản thỏa thuận nguyên tắc (Term Sheet) và giải phóng các điểm nghẽn rà soát thông tin.',
    SERV_8_TITLE: 'Hộ tống Giá trị Hậu Thương vụ',
    SERV_8_DESC: 'Xây dựng cấu trúc phòng họp Đại hội đồng cổ đông định kỳ (Board Pack), báo cáo hiệu quả giải ngân dòng vốn, tối ưu hiệu suất vận hành và xây dựng lộ trình cho các vòng gọi vốn kế tiếp.',

    // Industries
    IND_TITLE: 'Tiêu dùng Việt Nam — Thị trường Trọng điểm',
    IND_DESC: 'Chúng tôi chỉ tập trung vào các lĩnh vực kinh doanh nơi sức mạnh thương hiệu, hệ thống phân phối bền bỉ, kỷ luật vận hành cao và khả năng thấu hiểu khách hàng quyết định giá trị thặng dư.',
    IND_1_TITLE: 'FMCG / Hàng tiêu dùng nhanh',
    IND_1_SUB: 'Thương hiệu thực phẩm đóng gói, đồ uống, sản phẩm chăm sóc gia đình và cá nhân.',
    IND_2_TITLE: 'Bán lẻ & Phân phối',
    IND_2_SUB: 'Chuỗi cửa hàng tiện lợi, bán lẻ chuyên biệt và mô hình bán hàng trực tiếp đến người tiêu dùng (D2C).',
    IND_3_TITLE: 'F&B / Ẩm thực chuỗi',
    IND_3_SUB: 'Chuỗi nhà hàng, cà phê, mô hình dịch vụ ăn uống có công thức nhân bản quy mô nhanh chóng.',
    IND_4_TITLE: 'Công nghệ Tiêu dùng',
    IND_4_SUB: 'Nền tảng công nghệ tối ưu hóa trải nghiệm khách hàng, trung thành thương hiệu và thanh toán số.',
    IND_5_TITLE: 'Thương mại Đa kênh',
    IND_5_SUB: 'Thương hiệu tiêu dùng số xuất sắc tận dụng sức mạnh tích hợp đa kênh (Omnichannel).',

    // Why AG Capital
    WHY_TITLE: 'Sự Khác Biệt Từ AG Capital Advisory',
    WHY_1_TITLE: 'Am hiểu Sâu sắc Ngành Tiêu dùng',
    WHY_1_DESC: 'Sở hữu năng lực phân tích thị trường tiêu dùng Việt Nam từ bản chất phân phối, quản lý chuỗi cung ứng đến tối ưu hóa biên lợi nhuận EBITDA.',
    WHY_2_TITLE: 'Mô hình Boutique Chọn lọc',
    WHY_2_DESC: 'Chúng tôi không nhận dự án đại trà. Mỗi thương vụ được tuyển chọn nhận được sự cam kết đồng hành trực tiếp, sâu sát nhất từ các chuyên gia cấp cao của chúng tôi.',
    WHY_3_TITLE: 'Quản trị Đi trước, Vốn bước theo sau',
    WHY_3_DESC: 'Tâm thế gọi vốn thành công phải được gieo từ sự minh bạch pháp lý, cơ chế hoạch chiến mạch lạc và hệ thống vận hành có kiểm soát.',
    WHY_4_TITLE: 'Đồng cam cộng khổ Lâu dài',
    WHY_4_DESC: 'Với những đối tác chọn lựa đặc biệt, chúng tôi cho phép hoán đổi một phần phí dịch vụ thành cổ phần sở hữu, cùng gánh vác rủi ro tăng trưởng bền vững.',
    WHY_QUOTE: '“Chúng tôi tuyển chọn khắt khe, chuẩn bị nghiêm cẩn và đồng hành lâu dài vượt trên một giao dịch thành công ngắn hạn.”',

    // Process section
    PROC_TITLE: 'Hành trình Tư vấn Khép kín & Bài bản',
    PROC_SUBTITLE: 'Chúng tôi tuân thủ các nguyên tắc bảo mật chặt chẽ nhất, thẩm định mức độ phù hợp ngay từ đầu và vạch rõ lộ trình chuẩn hóa.',
    PROC_DISCLAIMER_NOTE: 'Mọi hoạt động hợp tác tư vấn đều phải qua khâu đánh giá mức độ tương thích và xác lập hợp đồng dịch vụ pháp lý chính thức.',

    // Alignment Model
    ALIGN_TITLE: 'Mô hình Đồng hành Gắn kết Lợi ích',
    ALIGN_SUBTITLE: 'Cấu trúc phí thương mại của chúng tôi cam kết kết nối trực tiếp hiệu suất công việc với sự phát triển thực chất của doanh nghiệp.',
    ALIGN_1_TITLE: 'Cam kết Đồng hành Chuyên sâu',
    ALIGN_1_SUB: 'Phí tư vấn định kỳ (Retainer)',
    ALIGN_1_DESC: 'Duy trì đội ngũ chuyên gia cao cấp, xây dựng phòng dữ liệu mẫn cận, chuẩn hóa hồ sơ tư liệu doanh nghiệp một cách liên tục và bài bản.',
    ALIGN_2_TITLE: 'Kiên quyết dựa trên Kết quả thực tế',
    ALIGN_2_SUB: 'Phí thành công thương vụ (Success Fee)',
    ALIGN_2_DESC: 'Chỉ được kích hoạt và chi trả khi nguồn vốn đầu tư thực tế đã được giải ngân thành công vào tài khoản doanh nghiệp theo đúng cam kết.',
    ALIGN_3_TITLE: 'Liên kết Giá trị Lâu dài',
    ALIGN_3_SUB: 'Phí chuyển đổi Cổ phần (Fee-into-Equity)',
    ALIGN_3_DESC: 'Tại một số cơ duyên đặc biệt hữu hảo, một phần phí thành công sẽ được hoán đổi thành cổ phần thường, chứng quyền hoặc các công cụ tài chính SAFE tương thích.',
    ALIGN_FOOTNOTE: 'Lưu ý quan trọng: Trong năm tài chính đầu tiên, AG Capital chưa áp dụng hình thức đầu tư góp vốn trực tiếp bằng tiền mặt. Mọi cơ chế liên kết lợi ích lâu dài đều xuất phát từ mô hình chuyển đổi phí dịch vụ thành cổ phần (Fee-into-Equity).',

    // Founder Fit Checklist
    FIT_TITLE: 'Doanh nghiệp của bạn đã sẵn sàng đón nhận Dòng vốn Chiến lược?',
    FIT_Q1: 'Doanh nghiệp của bạn hoạt động trong chuỗi giá trị tiêu dùng tại Việt Nam?',
    FIT_Q2: 'Doanh nghiệp đã sở hữu doanh thu chứng minh, mô hình kinh doanh có hiệu lực thực tế?',
    FIT_Q3: 'Dòng vốn huy động được gắn liền với mục tiêu mở rộng kinh doanh thiết thực và mạch lạc?',
    FIT_Q4: 'Cấu trúc pháp lý hiện tại của bạn rõ ràng, không vướng tranh chấp quyền lợi?',
    FIT_Q5: 'Đội ngũ sáng lập có cam kết minh bạch số liệu tài chính và quản trị thực tế?',
    FIT_Q6: 'Bạn đang tìm kiếm một người bạn đồng hành tài chính bài bản, thay vì một đơn vị môi giới kết nối đầu tư nhanh?',
    FIT_CTA: 'Khởi động Đánh giá Năng lực bảo mật',
    FIT_SECONDARY: 'Thư viện Tài nguyên Sáng lập',

    // Insights Preview
    INSIGHTS_TITLE: 'Góc nhìn Quản trị & Giải pháp cấu trúc Vốn',
    INSIGHTS_CTA: 'Xem Toàn bộ Góc nhìn Chuyên sâu',

    // Final Homepage CTA
    FINAL_CTA_TITLE: 'Mọi bước chuẩn bị tối ưu định giá đều bắt đầu từ trước khi gặp nhà đầu tư đầu tiên.',
    FINAL_CTA_DESC: 'Để bắt đầu cuộc thảo luận riêng tư và bảo mật tuyệt đối về kế hoạch gọi vốn hoặc kiện toàn bộ máy vận hành doanh nghiệp của bạn, hãy kết nối cùng chúng tôi.',

    // Footer lines
    FOOTER_SHORT_DESC: 'Văn phòng tư vấn kiến thiết cấu trúc gọi vốn & quản trị uy tín cho các thương hiệu tiêu dùng tăng trưởng tại Việt Nam.',
    FOOTER_RIGHTS: 'Mọi quyền được bảo lưu bởi AG Capital Advisory.',
    FOOTER_LOCATION_LABEL: '285 Cách Mạng Tháng Tám, Phường 12, Quận 10, Thành phố Hồ Chí Minh, Việt Nam.',
    FOOTER_CONTACT: 'Liên hệ',
    FOOTER_SERVICES: 'Giải pháp',
    FOOTER_COMPANY: 'AG Capital',
    FOOTER_LEGAL: 'Pháp lý',

    // Legal links
    PRIVACY_POLICY: 'Chính sách Bảo mật',
    TERMS_OF_USE: 'Điều khoản sử dụng',
    ADVISORY_DISCLAIMER: 'Tuyên bố Miễn trừ Trách nhiệm',
    CONFIDENTIALITY_NOTICE: 'Cam kết Bảo mật Thông tin',

    // General Words
    BACK_TO_HOME: 'Quay lại Trang chủ',
    SUBMIT: 'Gửi yêu cầu',
    SUCCESS: 'Gửi thành công',
    SUBMIT_INQUIRY: 'Nộp Hồ Sơ Độc Bản',
    SEND_MESSAGE: 'Gửi tin nhắn',
    BOOK_MEETING: 'Đặt lịch tham vấn trực tiếp',
    LEARN_MORE: 'Tìm hiểu thêm',
    GET_IN_TOUCH: 'Kết nối đầu tư',
    READ_ARTICLE: 'Xem nội dung',
    EST_READING_TIME: 'phút đọc',
    CATEGORY: 'Phân loại',
    MODAL_BOOK_BADGE: 'GIAO TIẾP ĐỘC QUYỀN VÀ BẢO MẬT',
    MODAL_BOOK_TITLE: 'Đặt Lịch Tham Vấn Chiến Lược Riêng Tư',
    MODAL_SUBMIT_BADGE: 'CỔNG KẾT NỐI ĐỀ XUẤT GIAO DỊCH',
    MODAL_SUBMIT_TITLE: 'Nộp Hồ Sơ Đề Xuất Gọi Vốn Doanh Nghiệp',
    MODAL_SUBMIT_SUB: 'Mọi số liệu tài chính ban đầu đều được số hóa mã mật nhằm bảo vệ trọn vẹn chủ quyền sở hữu thông tin doanh nghiệp.',
  },
};

// Merge live visual editor overrides at startup if running in the browser
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('ag_translations_overrides');
    if (saved) {
      const overrides = JSON.parse(saved);
      for (const lang of ['EN', 'VI'] as const) {
        if (overrides[lang]) {
          for (const key in overrides[lang]) {
            TRANSLATIONS[lang][key] = overrides[lang][key];
          }
        }
      }
    }
  } catch (e) {
    console.warn('Error loading translation overrides:', e);
  }
}
