// 가계부 데이터
const financialData = [
    // 정민 데이터
    { 구분: '생활', 항목: '주차비', 수단: '아무카나', 지출액: 35000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '관리비', 수단: '삼성카드', 지출액: 200000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '통비', 수단: '통비카드', 지출액: 100000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '주유(월 3~4번)', 수단: '신한카드', 지출액: 230000, 수입액: 0, 사람: '정민' },
    { 구분: '저축', 항목: '환화보험', 수단: '급여통장', 지출액: 300000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '심비', 수단: '급여통장', 지출액: 80000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '운전자', 수단: '신한카드', 지출액: 10000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '인터넷TV', 수단: '삼성카드', 지출액: 40000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '구독(유투브,배민,개발,쿠팡)', 수단: '신한카드', 지출액: 50000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '폰', 수단: '삼성카드', 지출액: 25000, 수입액: 0, 사람: '정민' },
    { 구분: '생활', 항목: '메리츠암보험', 수단: '급여통장', 지출액: 70000, 수입액: 0, 사람: '정민' },
    { 구분: '저축', 항목: '청약', 수단: '급여통장', 지출액: 100000, 수입액: 0, 사람: '정민' },
    { 구분: '저축', 항목: '도약', 수단: '급여통장', 지출액: 700000, 수입액: 0, 사람: '정민' },
    { 구분: '대출', 항목: '주담대 2.2억', 수단: '신한통장', 지출액: 970000, 수입액: 0, 사람: '정민' },
    { 구분: '대출', 항목: '토스신용 2500', 수단: '토스통장', 지출액: 110000, 수입액: 0, 사람: '정민' },
    { 구분: '대출', 항목: '환화신용 1300', 수단: '급여통장', 지출액: 60000, 수입액: 0, 사람: '정민' },
    { 구분: '수입', 항목: '직장', 수단: '', 지출액: 0, 수입액: 5000000, 사람: '정민' },
    { 구분: '수입', 항목: '알바', 수단: '', 지출액: 0, 수입액: 500000, 사람: '정민' },
    
    // 지민 데이터
    { 구분: '저축', 항목: '청약', 수단: '지민통장', 지출액: 100000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: '도약', 수단: '지민통장', 지출액: 700000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: '내일', 수단: '지민통장', 지출액: 500000, 수입액: 0, 사람: '지민' },
    { 구분: '생활', 항목: '타야보험', 수단: '지민통장', 지출액: 110000, 수입액: 0, 사람: '지민' },
    { 구분: '생활', 항목: '심비', 수단: '지민통장', 지출액: 60000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: '라이나', 수단: '지민통장', 지출액: 120000, 수입액: 0, 사람: '지민' },
    { 구분: '생활', 항목: '건보로', 수단: '지민통장', 지출액: 60000, 수입액: 0, 사람: '지민' },
    { 구분: '생활', 항목: '국민연금', 수단: '지민통장', 지출액: 100000, 수입액: 0, 사람: '지민' },
    { 구분: '생활', 항목: '메리츠암보험', 수단: '지민통장', 지출액: 70000, 수입액: 0, 사람: '지민' },
    { 구분: '생활', 항목: '구독(유투브,쿠팡,넷플릭스,컬리)', 수단: '지민통장', 지출액: 40000, 수입액: 0, 사람: '지민' },
    { 구분: '생활', 항목: '폰', 수단: '지민통장', 지출액: 20000, 수입액: 0, 사람: '지민' },
    { 구분: '저축', 항목: '강호', 수단: '지민통장', 지출액: 100000, 수입액: 0, 사람: '지민' },
    { 구분: '수입', 항목: '직장', 수단: '', 지출액: 0, 수입액: 500000, 사람: '지민' },
    { 구분: '수입', 항목: '수업', 수단: '', 지출액: 0, 수입액: 800000, 사람: '지민' }
];

// 숫자 포맷팅 함수
function formatNumber(num) {
    return new Intl.NumberFormat('ko-KR').format(num);
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

function calculateCategoryStats() {
    const categoryStats = {};
    
    financialData.forEach(item => {
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

// 차트 생성 함수들
function createPersonChart() {
    const ctx = document.getElementById('personChart').getContext('2d');
    const personStats = calculatePersonStats();
    
    const labels = Object.keys(personStats);
    const data = labels.map(person => personStats[person].지출액);
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ₩${formatNumber(value)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function createCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const categoryStats = calculateCategoryStats();
    
    const labels = Object.keys(categoryStats);
    const data = labels.map(category => categoryStats[category].총액);
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
    
    new Chart(ctx, {
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

// 테이블 생성 함수들
function createPersonTable() {
    const personStats = calculatePersonStats();
    const tbody = document.getElementById('personTable');
    
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
}

function createCategoryTable() {
    const categoryStats = calculateCategoryStats();
    const tbody = document.getElementById('categoryTable');
    const totalExpense = calculateTotalExpense();
    
    Object.entries(categoryStats).forEach(([category, stats]) => {
        const row = document.createElement('tr');
        const percentage = ((stats.총액 / totalExpense) * 100).toFixed(1);
        
        row.innerHTML = `
            <td>${category}</td>
            <td class="amount negative">₩${formatNumber(stats.총액)}</td>
            <td>${percentage}%</td>
        `;
        
        tbody.appendChild(row);
    });
}

// 구분별 상세 분석 카드 생성
function createCategoryBreakdown() {
    const categoryStats = calculateCategoryStats();
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

// 요약 카드 업데이트
function updateSummaryCards() {
    const totalIncome = calculateTotalIncome();
    const totalExpense = calculateTotalExpense();
    const balance = calculateBalance();
    
    document.getElementById('totalIncome').textContent = `₩${formatNumber(totalIncome)}`;
    document.getElementById('totalExpense').textContent = `₩${formatNumber(totalExpense)}`;
    document.getElementById('balance').textContent = `₩${formatNumber(balance)}`;
    
    // 잔액에 따른 색상 변경
    const balanceElement = document.getElementById('balance');
    if (balance >= 0) {
        balanceElement.style.color = '#4CAF50';
    } else {
        balanceElement.style.color = '#F44336';
    }
}

// 초기화 함수
function init() {
    updateSummaryCards();
    createPersonChart();
    createCategoryChart();
    createPersonTable();
    createCategoryTable();
    createCategoryBreakdown();
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', init); 