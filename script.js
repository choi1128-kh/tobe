// 리더라인 전용 데이터 라벨 플러그인 (금액 + 리더 라인)
const dataLabelPlugin = {
    id: 'dataLabel',
    afterDatasetsDraw(chart, args, options) {
        const { ctx, data, chartArea } = chart;
        ctx.save();
        
        data.datasets.forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);
            if (!meta.hidden && (chart.config.type === 'pie' || chart.config.type === 'doughnut')) {
                meta.data.forEach((element, index) => {
                    // 데이터 값과 라벨 계산
                    const dataValue = dataset.data[index];
                    const label = data.labels[index];
                    const formattedValue = `₩${formatNumber(dataValue)}`;
                    
                    // 세그먼트 각도 계산
                    const startAngle = element.startAngle;
                    const endAngle = element.endAngle;
                    const midAngle = (startAngle + endAngle) / 2;
                    
                    // 차트 중심점과 반지름
                    const centerX = element.x;
                    const centerY = element.y;
                    const outerRadius = element.outerRadius;
                    
                    // 폰트 설정
                    const fontSize = getDataLabelFontSize();
                    ctx.font = `bold ${fontSize}px Arial`;
                    
                    // 모든 라벨을 외부에 리더 라인과 함께 표시
                    const lineEndRadius = outerRadius + 15;
                    const labelRadius = outerRadius + 50;
                    
                    const lineEndX = centerX + Math.cos(midAngle) * lineEndRadius;
                    const lineEndY = centerY + Math.sin(midAngle) * lineEndRadius;
                    
                    const labelX = centerX + Math.cos(midAngle) * labelRadius;
                    const labelY = centerY + Math.sin(midAngle) * labelRadius;
                    
                    // 텍스트 정렬 조정 (좌우 균형 맞춤)
                    const isRightSide = Math.cos(midAngle) > 0;
                    const finalLabelX = isRightSide ? labelX + 30 : labelX - 30;
                    
                    // 리더 라인 그리기 (세그먼트 → 중간점 → 라벨)
                    ctx.strokeStyle = '#666';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    // 세그먼트 가장자리에서 시작
                    ctx.moveTo(centerX + Math.cos(midAngle) * outerRadius, centerY + Math.sin(midAngle) * outerRadius);
                    // 중간 연결점
                    ctx.lineTo(lineEndX, lineEndY);
                    // 라벨 쪽으로 수평선
                    ctx.lineTo(finalLabelX - (isRightSide ? 10 : -10), labelY);
                    ctx.stroke();
                    
                    // 금액 텍스트 그리기
                    ctx.textAlign = isRightSide ? 'left' : 'right';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#333';
                    ctx.fillText(formattedValue, finalLabelX, labelY - 8);
                    
                    // 라벨명 그리기 (작은 글씨로)
                    ctx.font = `${fontSize - 2}px Arial`;
                    ctx.fillStyle = '#666';
                    ctx.fillText(label, finalLabelX, labelY + 8);
                });
            }
        });
        
        ctx.restore();
    }
};

// 플러그인 등록
Chart.register(dataLabelPlugin);

// 가계부 데이터
const financialDataAsis = [
    // 정민 데이터
    { 구분: '생활', 항목: '주차비', 수단: '삼성카드', 지출액: 35000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '관리비', 수단: '삼성카드', 지출액: 200000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '톨비', 수단: '톨비카드', 지출액: 100000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '주유(월 3~4번)', 수단: '신한카드', 지출액: 230000, 수입액: 0, 사람: '정민' },
    { 구분: '저축', 항목: '한화보험', 수단: '급여통장', 지출액: 300000, 수입액: 0, 사람: '정민' },
    { 구분: '보험', 항목: '실비', 수단: '급여통장', 지출액: 80000, 수입액: 0, 사람: '정민' },
    { 구분: '보험', 항목: '운전자', 수단: '신한카드', 지출액: 10000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '인터넷TV', 수단: '삼성카드', 지출액: 40000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '구독(유튜브,배민,개발,쿠팡)', 수단: '신한카드', 지출액: 50000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '폰', 수단: '삼성카드', 지출액: 25000, 수입액: 0, 사람: '정민' },
    { 구분: '보험', 항목: '메리츠암보험', 수단: '급여통장', 지출액: 70000, 수입액: 0, 사람: '정민' },
    { 구분: '저축', 항목: '청약', 수단: '급여통장', 지출액: 100000, 수입액: 0, 사람: '정민' },
    { 구분: '저축', 항목: '도약', 수단: '급여통장', 지출액: 700000, 수입액: 0, 사람: '정민' },
    { 구분: '대출', 항목: '주담대 2.2억', 수단: '신한통장', 지출액: 970000, 수입액: 0, 사람: '정민' },
    { 구분: '대출', 항목: '토스신용 2500', 수단: '토스통장', 지출액: 110000, 수입액: 0, 사람: '정민' },
    { 구분: '대출', 항목: '한화신용 1300', 수단: '급여통장', 지출액: 60000, 수입액: 0, 사람: '정민' },
    { 구분: '수입', 항목: '직장', 수단: '', 지출액: 0, 수입액: 5000000, 사람: '정민' },
    { 구분: '수입', 항목: '알바', 수단: '', 지출액: 0, 수입액: 500000, 사람: '정민' },
    { 구분: '저축', 항목: '연금저축', 수단: '급여통장', 지출액: 500000, 수입액: 0, 사람: '정민' },
    { 구분: '저축', 항목: 'IRP', 수단: '급여통장', 지출액: 250000, 수입액: 0, 사람: '정민' },
    
    // 지민 데이터
    { 구분: '저축', 항목: '청약', 수단: '지민통장', 지출액: 100000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: '도약', 수단: '지민통장', 지출액: 700000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: '내일', 수단: '지민통장', 지출액: 500000, 수입액: 0, 사람: '지민' },
    { 구분: '보험', 항목: '태아보험', 수단: '지민통장', 지출액: 110000, 수입액: 0, 사람: '지민' },
    { 구분: '보험', 항목: '실비', 수단: '지민통장', 지출액: 60000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: '라이나', 수단: '지민통장', 지출액: 120000, 수입액: 0, 사람: '지민' },
    { 구분: '보험', 항목: '건보료', 수단: '지민통장', 지출액: 60000, 수입액: 0, 사람: '지민' },
    { 구분: '보험', 항목: '국민연금', 수단: '지민통장', 지출액: 100000, 수입액: 0, 사람: '지민' },
    { 구분: '보험', 항목: '메리츠암보험', 수단: '지민통장', 지출액: 70000, 수입액: 0, 사람: '지민' },
    { 구분: '생활', 항목: '구독(유튜브,쿠팡,넷플릭스,컬리)', 수단: '지민통장', 지출액: 40000, 수입액: 0, 사람: '지민' },
    { 구분: '생활', 항목: '폰', 수단: '지민통장', 지출액: 20000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: '강호', 수단: '지민통장', 지출액: 100000, 수입액: 0, 사람: '지민' },
    { 구분: '수입', 항목: '직장', 수단: '', 지출액: 0, 수입액: 500000, 사람: '지민' },
    { 구분: '수입', 항목: '월세', 수단: '', 지출액: 0, 수입액: 800000, 사람: '지민' },
    { 구분: '저축', 항목: '연금저축', 수단: '지민통장', 지출액: 500000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: 'IRP', 수단: '지민통장', 지출액: 250000, 수입액: 0, 사람: '지민' }
];


const financialDataTobe = [
    // 정민 데이터
    { 구분: '생활', 항목: '주차비', 수단: '삼성카드', 지출액: 35000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '관리비', 수단: '삼성카드', 지출액: 200000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '톨비', 수단: '톨비카드', 지출액: 100000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '주유(월 3~4번)', 수단: '신한카드', 지출액: 230000, 수입액: 0, 사람: '정민' },
    { 구분: '저축', 항목: '한화보험', 수단: '급여통장', 지출액: 300000, 수입액: 0, 사람: '정민' },
    { 구분: '보험', 항목: '실비', 수단: '급여통장', 지출액: 80000, 수입액: 0, 사람: '정민' },
    { 구분: '보험', 항목: '운전자', 수단: '신한카드', 지출액: 10000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '인터넷TV', 수단: '삼성카드', 지출액: 40000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '구독(유튜브,배민,개발,쿠팡)', 수단: '신한카드', 지출액: 50000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '폰', 수단: '삼성카드', 지출액: 25000, 수입액: 0, 사람: '정민' },
    { 구분: '보험', 항목: '메리츠암보험', 수단: '급여통장', 지출액: 70000, 수입액: 0, 사람: '정민' },
    { 구분: '저축', 항목: '청약', 수단: '급여통장', 지출액: 100000, 수입액: 0, 사람: '정민' },
    { 구분: '저축', 항목: '도약', 수단: '급여통장', 지출액: 700000, 수입액: 0, 사람: '정민' },
    { 구분: '대출', 항목: '주담대 1억500', 수단: '신한통장', 지출액: 440000, 수입액: 0, 사람: '정민' },
    { 구분: '수입', 항목: '직장', 수단: '', 지출액: 0, 수입액: 5000000, 사람: '정민' },
    { 구분: '수입', 항목: '알바', 수단: '', 지출액: 0, 수입액: 500000, 사람: '정민' },
    { 구분: '저축', 항목: '연금저축', 수단: '급여통장', 지출액: 500000, 수입액: 0, 사람: '정민' },
    { 구분: '저축', 항목: 'IRP', 수단: '급여통장', 지출액: 250000, 수입액: 0, 사람: '정민' },
    
    // 지민 데이터
    { 구분: '저축', 항목: '청약', 수단: '지민통장', 지출액: 100000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: '도약', 수단: '지민통장', 지출액: 700000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: '내일', 수단: '지민통장', 지출액: 500000, 수입액: 0, 사람: '지민' },
    { 구분: '보험', 항목: '태아보험', 수단: '지민통장', 지출액: 110000, 수입액: 0, 사람: '지민' },
    { 구분: '보험', 항목: '실비', 수단: '지민통장', 지출액: 60000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: '라이나', 수단: '지민통장', 지출액: 120000, 수입액: 0, 사람: '지민' },
    { 구분: '보험', 항목: '건보료', 수단: '지민통장', 지출액: 60000, 수입액: 0, 사람: '지민' },
    { 구분: '보험', 항목: '국민연금', 수단: '지민통장', 지출액: 100000, 수입액: 0, 사람: '지민' },
    { 구분: '보험', 항목: '메리츠암보험', 수단: '지민통장', 지출액: 70000, 수입액: 0, 사람: '지민' },
    { 구분: '생활', 항목: '구독(유튜브,쿠팡,넷플릭스,컬리)', 수단: '지민통장', 지출액: 40000, 수입액: 0, 사람: '지민' },
    { 구분: '생활', 항목: '폰', 수단: '지민통장', 지출액: 20000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: '강호', 수단: '지민통장', 지출액: 100000, 수입액: 0, 사람: '지민' },
    { 구분: '대출', 항목: '보금자리론 1억5500', 수단: '지민통장', 지출액: 380000, 수입액: 0, 사람: '지민' },
    { 구분: '수입', 항목: '직장', 수단: '', 지출액: 0, 수입액: 500000, 사람: '지민' },
    { 구분: '수입', 항목: '월세', 수단: '', 지출액: 0, 수입액: 800000, 사람: '지민' },
    { 구분: '저축', 항목: '연금저축', 수단: '지민통장', 지출액: 500000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: 'IRP', 수단: '지민통장', 지출액: 250000, 수입액: 0, 사람: '지민' }
];

// 현재 사용 중인 데이터 (기본값: As-Is)
let financialData = financialDataAsis;
let currentMode = 'asis';

// 차트 인스턴스 저장
let categoryChart = null;
let paymentChart = null;

// 현재 적용된 사람 필터
let currentPersonFilter = 'all';

// 사람별 필터 적용 함수
function applyPersonFilter() {
    const filterSelect = document.getElementById('personFilter');
    currentPersonFilter = filterSelect.value;
    
    console.log('필터 적용:', currentPersonFilter); // 디버깅용
    
    // 기존 차트 클리어
    if (categoryChart) {
        categoryChart.destroy();
        categoryChart = null;
    }
    if (paymentChart) {
        paymentChart.destroy();
        paymentChart = null;
    }
    
    // 상세내역 컨테이너 클리어
    document.getElementById('categoryBreakdown').innerHTML = '';
    document.getElementById('paymentBreakdown').innerHTML = '';
    
    // 필터링된 데이터로 차트와 상세내역만 업데이트
    createCategoryChart();
    createPaymentMethodChart();
    createCategoryBreakdown();
    createPaymentMethodBreakdown();
}

// 필터링된 데이터 반환 함수
function getFilteredData() {
    console.log('현재 필터:', currentPersonFilter);
    console.log('전체 데이터 개수:', financialData.length);
    
    if (currentPersonFilter === 'all') {
        console.log('전체 데이터 반환');
        return financialData;
    }
    
    const filtered = financialData.filter(item => item.사람 === currentPersonFilter);
    console.log('필터링된 데이터 개수:', filtered.length);
    return filtered;
}

// 데이터 전환 함수
function switchDataMode(mode) {
    currentMode = mode;
    financialData = mode === 'tobe' ? financialDataTobe : financialDataAsis;
    
    // UI 업데이트
    updateModeDisplay();
    updateAllViews();
}

// 모드 표시 업데이트
function updateModeDisplay() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    const lastUpdate = document.getElementById('lastUpdate');
    const dataVersion = document.getElementById('dataVersion');
    const filterSelect = document.getElementById('personFilter');
    
    modeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === currentMode) {
            btn.classList.add('active');
        }
    });
    
    if (currentMode === 'asis') {
        lastUpdate.textContent = '2025.07.09';
        dataVersion.textContent = 'As-Is (현재)';
    } else {
        lastUpdate.textContent = '2025.07.09';
        dataVersion.textContent = 'To-Be (목표)';
    }
    
    // 필터 상태 유지
    if (filterSelect) {
        filterSelect.value = currentPersonFilter;
    }
}

// 변화량 계산 함수
function calculateChanges() {
    const asisIncome = financialDataAsis.reduce((total, item) => total + item.수입액, 0);
    const asisExpense = financialDataAsis.reduce((total, item) => total + item.지출액, 0);
    const tobeIncome = financialDataTobe.reduce((total, item) => total + item.수입액, 0);
    const tobeExpense = financialDataTobe.reduce((total, item) => total + item.지출액, 0);
    
    return {
        incomeChange: tobeIncome - asisIncome,
        expenseChange: tobeExpense - asisExpense,
        balanceChange: (tobeIncome - tobeExpense) - (asisIncome - asisExpense)
    };
}

// 전체 뷰 업데이트
function updateAllViews() {
    // 기존 차트와 테이블 클리어
    clearAllViews();
    
    // 새로운 데이터로 업데이트
    updateSummaryCards();
    createCategoryChart();
    createPaymentMethodChart();
    createPersonTable();
    createCategoryTable();
    createPaymentMethodTable();
    createCategoryBreakdown();
    createPaymentMethodBreakdown();
}

// 모든 뷰 클리어
function clearAllViews() {
    // 차트 클리어
    if (categoryChart) {
        categoryChart.destroy();
        categoryChart = null;
    }
    if (paymentChart) {
        paymentChart.destroy();
        paymentChart = null;
    }
    
    // 테이블 클리어
    document.getElementById('personTable').innerHTML = '';
    document.getElementById('categoryTable').innerHTML = '';
    document.getElementById('paymentTable').innerHTML = '';
    document.getElementById('categoryBreakdown').innerHTML = '';
    document.getElementById('paymentBreakdown').innerHTML = '';
}

// 숫자 포맷팅 함수
function formatNumber(num) {
    return new Intl.NumberFormat('ko-KR').format(num);
}

// 모바일 화면 크기에 따른 라벨 폰트 크기 조정
function getDataLabelFontSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
        return 10; // 모바일
    } else if (screenWidth < 768) {
        return 11; // 태블릿
    } else {
        return 12; // 데스크톱
    }
}

// 통계 계산 함수들
function calculateTotalIncome() {
    return financialData.reduce((total, item) => total + item.수입액, 0);
}

function calculateTotalExpense() {
    return financialData.reduce((total, item) => total + item.지출액, 0);
}

function calculateBalance() {
    return calculateTotalIncome() - calculateTotalExpense();
}

function calculatePersonStats() {
    const personStats = {};
    
    financialData.forEach(item => {
        if (!personStats[item.사람]) {
            personStats[item.사람] = {
                지출액: 0,
                수입액: 0,
                항목들: []
            };
        }
        
        personStats[item.사람].지출액 += item.지출액;
        personStats[item.사람].수입액 += item.수입액;
        
        if (item.지출액 > 0) {
            personStats[item.사람].항목들.push({
                구분: item.구분,
                항목: item.항목,
                금액: item.지출액
            });
        }
    });
    
    return personStats;
}

function calculateCategoryStats(useFilter = false) {
    const categoryStats = {};
    const dataToUse = useFilter ? getFilteredData() : financialData;
    
    dataToUse.forEach(item => {
        if (item.구분 !== '수입' && item.지출액 > 0) {
            if (!categoryStats[item.구분]) {
                categoryStats[item.구분] = {
                    총액: 0,
                    항목들: []
                };
            }
            
            categoryStats[item.구분].총액 += item.지출액;
            categoryStats[item.구분].항목들.push({
                항목: item.항목,
                금액: item.지출액,
                사람: item.사람
            });
        }
    });
    
    return categoryStats;
}

// 수단별 지출 분석 함수
function calculatePaymentMethodStats(useFilter = false) {
    const paymentStats = {};
    const dataToUse = useFilter ? getFilteredData() : financialData;
    
    dataToUse.forEach(item => {
        if (item.구분 !== '수입' && item.지출액 > 0 && item.수단) {
            if (!paymentStats[item.수단]) {
                paymentStats[item.수단] = {
                    총액: 0,
                    항목들: []
                };
            }
            
            paymentStats[item.수단].총액 += item.지출액;
            paymentStats[item.수단].항목들.push({
                구분: item.구분,
                항목: item.항목,
                금액: item.지출액,
                사람: item.사람
            });
        }
    });
    
    return paymentStats;
}



// 차트 생성 함수들
function createCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const categoryStats = calculateCategoryStats(true);
    
    const labels = Object.keys(categoryStats);
    const data = labels.map(category => categoryStats[category].총액);
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
    
    categoryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 0,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ₩${formatNumber(context.parsed.y)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₩' + formatNumber(value);
                        }
                    }
                }
            }
        }
    });
}

// 수단별 차트 생성 (바차트, 내림차순)
function createPaymentMethodChart() {
    const ctx = document.getElementById('paymentChart').getContext('2d');
    const paymentStats = calculatePaymentMethodStats(true);
    
    // 내림차순으로 정렬
    const sortedEntries = Object.entries(paymentStats)
        .sort((a, b) => b[1].총액 - a[1].총액);
    
    const labels = sortedEntries.map(entry => entry[0]);
    const data = sortedEntries.map(entry => entry[1].총액);
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#A8E6CF', '#FFB6C1'];
    
    paymentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 0,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed.y / total) * 100).toFixed(1);
                            return `${context.label}: ₩${formatNumber(context.parsed.y)} (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₩' + formatNumber(value);
                        }
                    }
                }
            }
        }
    });
}

// 테이블 생성 함수들
function createPersonTable() {
    const personStats = calculatePersonStats();
    const tbody = document.getElementById('personTable');
    
    // 개별 사람별 데이터 추가
    Object.entries(personStats).forEach(([person, stats]) => {
        const row = document.createElement('tr');
        const netAmount = stats.수입액 - stats.지출액;
        
        row.innerHTML = `
            <td>${person}</td>
            <td class="amount negative">₩${formatNumber(stats.지출액)}</td>
            <td class="amount positive">₩${formatNumber(stats.수입액)}</td>
            <td class="amount ${netAmount >= 0 ? 'positive' : 'negative'}">₩${formatNumber(netAmount)}</td>
        `;
        
        tbody.appendChild(row);
    });
    
    // 합계 row 추가
    const totalExpense = calculateTotalExpense();
    const totalIncome = calculateTotalIncome();
    const totalNetAmount = totalIncome - totalExpense;
    
    const totalRow = document.createElement('tr');
    totalRow.style.borderTop = '2px solid #333';
    totalRow.style.fontWeight = 'bold';
    totalRow.innerHTML = `
        <td>합계</td>
        <td class="amount negative">₩${formatNumber(totalExpense)}</td>
        <td class="amount positive">₩${formatNumber(totalIncome)}</td>
        <td class="amount ${totalNetAmount >= 0 ? 'positive' : 'negative'}">₩${formatNumber(totalNetAmount)}</td>
    `;
    
    tbody.appendChild(totalRow);
}

function createCategoryTable() {
    const categoryStats = calculateCategoryStats();
    const tbody = document.getElementById('categoryTable');
    
    // 내림차순으로 정렬
    const sortedEntries = Object.entries(categoryStats)
        .sort((a, b) => b[1].총액 - a[1].총액);
    
    sortedEntries.forEach(([category, stats]) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${category}</td>
            <td class="amount negative">₩${formatNumber(stats.총액)}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// 수단별 테이블 생성
function createPaymentMethodTable() {
    const paymentStats = calculatePaymentMethodStats();
    const tbody = document.getElementById('paymentTable');
    
    // 내림차순으로 정렬
    const sortedEntries = Object.entries(paymentStats)
        .sort((a, b) => b[1].총액 - a[1].총액);
    
    sortedEntries.forEach(([method, stats]) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${method}</td>
            <td class="amount negative">₩${formatNumber(stats.총액)}</td>
        `;
        
        tbody.appendChild(row);
    });
}



// 구분별 상세 분석 카드 생성
function createCategoryBreakdown() {
    const categoryStats = calculateCategoryStats(true);
    const container = document.getElementById('categoryBreakdown');
    
    Object.entries(categoryStats).forEach(([category, stats]) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        
        const itemsHtml = stats.항목들
            .sort((a, b) => b.금액 - a.금액)
            .map(item => `
                <li>
                    <span>${item.항목} (${item.사람})</span>
                    <span>₩${formatNumber(item.금액)}</span>
                </li>
            `).join('');
        
        card.innerHTML = `
            <div class="category-header">
                <div class="category-name">${category}</div>
                <div class="category-total">₩${formatNumber(stats.총액)}</div>
            </div>
            <ul class="category-items">
                ${itemsHtml}
            </ul>
        `;
        
        container.appendChild(card);
    });
}

// 수단별 상세 분석 카드 생성
function createPaymentMethodBreakdown() {
    const paymentStats = calculatePaymentMethodStats(true);
    const container = document.getElementById('paymentBreakdown');
    
    Object.entries(paymentStats).forEach(([method, stats]) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        
        const itemsHtml = stats.항목들
            .sort((a, b) => b.금액 - a.금액)
            .map(item => `
                <li>
                    <span>${item.항목} (${item.사람})</span>
                    <span>₩${formatNumber(item.금액)}</span>
                </li>
            `).join('');
        
        card.innerHTML = `
            <div class="category-header">
                <div class="category-name">${method}</div>
                <div class="category-total">₩${formatNumber(stats.총액)}</div>
            </div>
            <ul class="category-items">
                ${itemsHtml}
            </ul>
        `;
        
        container.appendChild(card);
    });
}



// 요약 카드 업데이트
function updateSummaryCards() {
    const totalIncome = calculateTotalIncome();
    const totalExpense = calculateTotalExpense();
    const balance = calculateBalance();
    const changes = calculateChanges();
    
    // 기본 값 업데이트
    document.getElementById('totalIncome').textContent = `₩${formatNumber(totalIncome)}`;
    document.getElementById('totalExpense').textContent = `₩${formatNumber(totalExpense)}`;
    document.getElementById('balance').textContent = `₩${formatNumber(balance)}`;
    
    // 변화량 표시 추가/업데이트
    updateChangeIndicator('totalIncome', changes.incomeChange);
    updateChangeIndicator('totalExpense', changes.expenseChange);
    updateChangeIndicator('balance', changes.balanceChange);
    
    // 잔액에 따른 색상 변경
    const balanceElement = document.getElementById('balance');
    if (balance >= 0) {
        balanceElement.style.color = '#4CAF50';
    } else {
        balanceElement.style.color = '#F44336';
    }
}

// 변화 지시자 업데이트
function updateChangeIndicator(elementId, changeAmount) {
    const parentElement = document.getElementById(elementId).parentElement;
    let indicator = parentElement.querySelector('.change-indicator');
    
    if (!indicator) {
        indicator = document.createElement('span');
        indicator.className = 'change-indicator';
        parentElement.appendChild(indicator);
    }
    
    // As-Is 모드일 때는 증감을 숨기거나 기준점으로 표시
    if (currentMode === 'asis') {
        if (changeAmount === 0) {
            indicator.textContent = '';
            indicator.className = 'change-indicator change-neutral';
        } else {
            indicator.textContent = '(기준)';
            indicator.className = 'change-indicator change-neutral';
        }
    } else {
        // To-Be 모드일 때만 As-Is 대비 증감 표시
        if (changeAmount === 0) {
            indicator.textContent = '(변화없음)';
            indicator.className = 'change-indicator change-neutral';
        } else if (changeAmount > 0) {
            indicator.textContent = `▲₩${formatNumber(Math.abs(changeAmount))}`;
            // 지출 증가는 빨간색, 수입 증가는 초록색
            indicator.className = `change-indicator ${elementId === 'totalExpense' ? 'change-up' : 'change-down'}`;
        } else {
            indicator.textContent = `▼₩${formatNumber(Math.abs(changeAmount))}`;
            // 지출 감소는 초록색, 수입 감소는 빨간색
            indicator.className = `change-indicator ${elementId === 'totalExpense' ? 'change-down' : 'change-up'}`;
        }
    }
}

// 초기화 함수
function init() {
    updateModeDisplay();
    updateSummaryCards();
    createCategoryChart();
    createPaymentMethodChart();
    createPersonTable();
    createCategoryTable();
    createPaymentMethodTable();
    createCategoryBreakdown();
    createPaymentMethodBreakdown();
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', init); 