<script setup>
const hasLogo = ref(false);
const hasHeader = useState("hasHeader");
const hasMainDisclaimer = ref(false);

onMounted(() => {
    setTimeout(() => {
        hasLogo.value = true;
        setTimeout(() => {
            hasLogo.value = false;
        }, 1500);
    }, 1500);
});
</script>

<template>
    <div class="main-content">
        <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            @leave="(hasHeader, (hasMainDisclaimer = true))"
        >
            <div class="absolute inset-0 z-0 flex items-center justify-center" v-if="hasLogo">
                <div class="aspect-760/320 w-[39.6cqw] max-w-[760px]">
                    <SharpImg src="logo_ktm2.png" />
                </div>
            </div>
        </Transition>
        <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
        >
            <PopupBox
                :fixed="false"
                :enterUrl="'/home'"
                v-if="hasMainDisclaimer"
            >
                <div
                    class="prose font-light text-(--text-color-primary)"
                >
                    <p class="@min-[992px]:text-[1.04cqw] @min-[1920px]:text-[1.25em]!"">
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
                </div>
            </PopupBox>
        </Transition>
    </div>
</template>

<style scoped>
@reference "~/assets/css/style.css";
</style>
