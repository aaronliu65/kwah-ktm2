<style scoped>
@reference "~/assets/css/style.css";

.footer {
    @apply relative overflow-hidden bg-(--theme-color-secondary)/90 @min-[769px]:pt-[5.52cqw] @min-[1920px]:pt-26.5 py-6 @min-[769px]:pb-[9.63cqw] @min-[1920px]:pb-46.25 text-(--text-color-primary);

    .inner-footer {
        @apply mx-auto @min-[769px]:w-[85%] px-4 text-center;
    }
}
</style>

<template>
    <div class="footer">
        <div class="inner-footer">
            <div class="mb-12 @min-[1280px]:mb-24 flex items-center justify-center gap-[2.92cqw] @min-[1920px]:gap-14">
                <div class="aspect-392/69 w-[392px]">
                    <svgo_logo-kwah
                        filled
                        :fontControlled="false"
                        class="w-full"
                    />
                </div>
                <div class="aspect-540/63 w-[540px]">
                    <svgo_logo-wheelock
                        filled
                        :fontControlled="false"
                        class="w-full"
                    />
                </div>
                <div class="aspect-315/67 w-[315px]">
                    <svgo_logo-china-oversea
                        filled
                        :fontControlled="false"
                        class="w-full"
                    />
                </div>
            </div>
            <div
                class="mb-[0.3rem] text-[1.5em] @min-[769px]:text-[2.625cqw] tracking-[0.2em] @min-[1920px]:text-[3.15em] [html[data-lang='en']_&]:uppercase [html[data-lang='en']_&]:tracking-normal @max-[768px]:[html[data-lang='en']_&]:text-[1.25em]"
            >
                <Translate>
                    <template #en
                        >On-site show flat available for<br/>viewing by
                        appointment</template
                    >
                    <template #tc> 現樓示範單位 歡迎預約參觀 </template>
                </Translate>
            </div>
            <div class="mb-12 @min-[1280px]:mb-24 text-[0.875em] @min-[769px]:text-[1.125cqw] @min-[1920px]:text-[1.35em]">
                <Translate>
                    <template #en> Enquiry Hotline: </template>
                    <template #tc> 查詢熱線： </template>
                </Translate>

                <a href="tel:28808268" class="text-[2.65em]">2880 8268</a>
            </div>
            <div class="prose">
                <Translate>
                    <template #en>
                        <p
                            class="@min-[992px]:text-[1.04cqw] @min-[1920px]:text-[1.25em]!"
                        >
                            Name of the Development and the Phase: KT Marina
                            (the “Development”), Phase 2 of which is called “KT
                            Marina 2” (the "Phase"). | District in which the
                            Phase is situated: Kai Tak |Street number and name
                            of the street at which the Phase is situated: 15
                            Shing Fung Road |Address of the website designated
                            by the Vendor for the Phase: www.ktmarina2.com.hk
                            <br />
                            The photographs, images, drawings or sketches shown
                            in this advertisement / promotional material
                            represent an artist's impression of the development
                            concerned only. They are not drawn to scale and/or
                            may have been edited and processed with computerized
                            imaging techniques. Prospective purchasers should
                            make reference to the sales brochure for details of
                            the development. The vendor also advises prospective
                            purchasers to conduct an on-site visit for a better
                            understanding of the development site, its
                            surrounding environment and the public facilities
                            nearby.
                        </p>
                        <p class="text-[0.75em]!">
                            This advertisement/promotional material is only
                            intended to promote the sale of residential
                            properties in Phase 2 of the Development. “Star
                            Boulevard” is a promotion name of Phase 2 and is for
                            reference only. It will not appear in the land
                            grant, deed of mutual covenant, sub-deed of mutual
                            covenant, agreements for sale and purchase,
                            assignments, or other title documents of the
                            Development and/or the Phase. | Vendor: Dragon Star
                            H.K. Investments Limited | Holding company of the
                            Vendor: Gainable Development Limited | Authorized
                            Person for the Phase: Ng Kwok Fai | Firm or
                            corporation of which the Authorized Person for the
                            Phase is a proprietor, director or employee in his
                            or her professional capacity: LWK & Partners (HK)
                            Limited | Building contractor for the Phase: Hip
                            Hing Construction Company Limited | Firms of
                            solicitors acting for the owner in relation to the
                            sale of residential properties in the Phase: Baker &
                            McKenzie, Deacons and Grandall Zimmern Law Firm |
                            Authorized institutions that have made a loan, or
                            have undertaken to provide finance, for the
                            construction of the Phase: DBS Bank Ltd., Hong Kong
                            Branch, DBS Bank (Hong Kong) Limited, Industrial and
                            Commercial Bank of China (Asia) Limited (Notes: The
                            relevant loan has been repaid in full. ) | Other
                            persons who have made a loan for the construction of
                            the Phase: Turnwell Limited, NART Finance Limited,
                            China Overseas Project Development Limited | The
                            estimated material date for Phase 2 of the
                            Development to the best of the Vendor’s knowledge:
                            30 June 2026 ("Material date" means the date on
                            which the conditions of the land grant are complied
                            with in respect of the Phase. The estimated material
                            date is subject to any extension of time that is
                            permitted under the agreement for sale and
                            purchase.) | This advertisement/promotional material
                            is for reference only. It does not constitute and
                            shall not be construed as making any offer,
                            representation, covenant, warranty or contractual
                            term, whether express or implied (whether related to
                            view or not). The Vendor reserves its right to amend
                            the building plans and other plans from time to
                            time, and the design of the Development and/or the
                            Phase is subject to the final plans approved by the
                            relevant Government authorities. There may be future
                            changes to the Development and/or the Phase and the
                            surrounding areas. Market conditions may change from
                            time to time. Prospective purchasers shall not rely
                            on or be influenced by any content or information
                            contained in this advertisement/promotional material
                            in deciding whether to purchase or when to purchase
                            any residential property. The Vendor shall not be
                            liable to any damage sustained by any person arising
                            from his decision of purchase or other decisions
                            made by reliance on the content contained in this
                            advertisement/promotional material. Prospective
                            purchasers should obtain and review carefully all
                            relevant information relating to the property(ies)
                            and consider carefully before making any decision of
                            purchase. For any enquiry, please seek your own
                            professional advice. This advertisement/promotional
                            material is published by the Vendor or with the
                            consent of the Vendor. A prospective purchaser is
                            advised to refer to the sales brochure for any
                            information on the Development and/or the Phase.
                            Please refer to the sales brochure for details. The
                            sales brochure of Phase 2 is not yet made available
                            on the date of last update of this advertisement /
                            promotional material. | Date of Last Update: 25
                            February 2026
                        </p>
                    </template>
                    <template #tc>
                        <p
                            class="@min-[992px]:text-[1.04cqw] @min-[1920px]:text-[1.25em]!"
                        >
                            發展項目及期數名稱：啟德海灣(「發展項目」)。發展項目的第1期稱為「啟德海灣1」。發展項目的第2期稱為「啟德海灣2」。期數所位於的區域：啟德︱期數所位於的街道的名稱及門牌號數：承豐道15號︱賣方就期數指定的互聯網網站的網址：www.ktmarina.com.hk︱本廣告/宣傳資料內載列的相片、圖像、繪圖或素描顯示純屬畫家對有關發展項目之想像。有關相片、圖像、繪圖或素描並非按照比例繪畫及/或可能經過電腦修飾處理。準買家如欲了解發展項目的詳情，請參閱售樓說明書。賣方亦建議準買家到有關發展地盤作實地考察，以對該發展地盤、其周邊地區環境及附近的公共設施有較佳了解。
                        </p>
                        <p class="text-[0.75em]!">
                            本廣告/宣傳資料僅為促銷發展項目第2期內的住宅物業。｜賣方：星龍香港投資有限公司｜賣方的控權公司：錦浩發展有限公司｜期數的認可人士：吳國輝｜期數的認可人士以其專業身分擔任經營人、董事或僱員的商號或法團：梁黃顧建築師(香港)事務所有限公司｜期數的承建商：
                            協興建築有限公司｜就期數中的住宅物業的出售而代表擁有人行事的律師事務所：貝克
                            •
                            麥堅時律師事務所、的近律師行及國浩律師(香港)事務所｜已為期數的建造提供貸款或已承諾為該項建造提供融資的認可機構：DBS
                            Bank Ltd., Hong Kong
                            Branch、星展銀行(香港)有限公司、中國工商銀行(亞洲)有限公司(註：1.
                            有關貸款已全數清還。2.
                            由星展銀行(香港)有限公司提供的承諾書已經獲政府退回並取消。)｜已為期數的建造提供貸款的其他人：通旭有限公司、NART
                            Finance
                            Limited、中海業務發展有限公司｜盡賣方所知的發展項目第2期的預計關鍵日期：2026年6月30日(「關鍵日期」指批地文件的條件就期數而獲符合的日期。預計關鍵日期是受到買賣合約所允許的任何延期所規限的。)｜本廣告/宣傳資料僅供參考，並不構成亦不得詮釋成作出任何不論明示或隱含之要約、陳述、承諾、保證或合約條款(不論與發展項目、發展項目內的物業、外觀、景觀及會所設施等是否有關)。賣方保留權利不時改動建築圖則及其他圖則，發展項目之設計以政府相關部門最後批准之圖則為準。發展項目及其周邊地區日後可能出現改變。市場情況不時變化，準買方不應以本廣告/宣傳資料內之任何內容或資料作依據或受其影響決定購買或於何時購買任何住宅物業。任何人依據本廣告/宣傳資料內之任何內容作購買或其他決定而導致任何損失，賣方一概不負責。在作出購買決定前，應先取得物業的所有相關資料及仔細考量。如有疑問，應自行尋求專業意見。本廣告/宣傳資料由賣方或在賣方的同意下發布。賣方建議準買方參閱有關售樓說明書，以了解發展項目的資料。詳情請參閱售樓說明書。於本廣告/宣傳資料的製作日期，發展項目第2期的售樓說明書尚未發布。｜最後更新日期：2026年2月25日
                        </p>
                    </template>
                </Translate>
            </div>
        </div>
    </div>
</template>
