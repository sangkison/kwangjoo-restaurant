// API 설정
const API_BASE_URL = 'https://api.odcloud.kr/api/3083730/v1/uddi:6b8d6f79-21df-434b-aca1-d1c4477b3835'; /*API 기본 URL*/
const API_KEY = '23db91f19823a8f94280869655ce25dce78b0954d36416a4a62464e17134670f'; /*API 키*/
const PAGE_SIZE = 10; /*10개만 가져오기*/

// DOM 요소
const loadingElement = document.getElementById('loading'); /*loading 클래스에 적용*/
const errorElement = document.getElementById('error'); /*error 클래스에 적용*/
const restaurantListElement = document.getElementById('restaurantList'); /*restaurant-list 클래스에 적용*/

// API 호출 함수
async function fetchRestaurants() { /*fetchRestaurants 함수 선언*/
    try {
        loadingElement.style.display = 'block'; /*loading 클래스에 적용*/
        errorElement.style.display = 'none'; /*error 클래스에 적용*/

        // API 호출 URL 구성 (page=1, perPage=10)
        // 공공데이터 API는 serviceKey를 쿼리 파라미터로 전달
        const url = `${API_BASE_URL}?page=1&perPage=${PAGE_SIZE}&serviceKey=${API_KEY}`; /*API 호출 URL 구성*/
        
        console.log('Fetching from URL:', url); /*API 호출 URL 출력*/
        
        const response = await fetch(url); /*API 호출*/
        
        if (!response.ok) { /*API 호출 실패 시 예외 처리*/
            throw new Error(`HTTP error! status: ${response.status}`); /*HTTP 에러 예외 처리*/
        }

        const data = await response.json(); /*API 응답 데이터 파싱*/
        console.log('API Response:', data); /*API 응답 데이터 출력*/
        
        // API 응답 구조 확인 및 데이터 처리
        if (data.data && Array.isArray(data.data)) { /*API 응답 데이터가 배열인 경우*/
            displayRestaurants(data.data);
        } else if (data) { /*API 응답 데이터가 배열이 아닌 경우*/
            // 응답 구조가 다를 수 있으므로 전체 데이터 확인
            console.warn('Unexpected data structure:', data); /*API 응답 데이터 구조 예외 처리*/
            throw new Error('데이터 형식이 올바르지 않습니다.'); /*데이터 형식 예외 처리*/
        } else { /*API 응답 데이터가 없는 경우*/
            throw new Error('데이터가 없습니다.'); /*데이터 없음 예외 처리*/
        }

    } catch (error) { /*예외 처리*/
        console.error('Error fetching restaurants:', error); /*예외 출력*/
        errorElement.style.display = 'block'; /*error 클래스에 적용*/
        errorElement.innerHTML = ` /*error 클래스에 적용*/
            <p>데이터를 불러오는데 실패했습니다: ${error.message}</p> /*예외 메시지 출력*/
            <p style="font-size: 0.9em; margin-top: 10px;"> /*예외 메시지 출력*/
                CORS 정책으로 인해 브라우저에서 직접 호출이 차단될 수 있습니다.<br>
                로컬 웹 서버를 사용하거나 개발자 도구의 콘솔을 확인해주세요. /*예외 메시지 출력*/ 
            </p>
        `;
    } finally { /*예외 처리 종료*/
        loadingElement.style.display = 'none'; /*loading 클래스에 적용*/
    }
}

// 음식점 목록 표시 함수
function displayRestaurants(restaurants) { /*displayRestaurants 함수 선언*/
    restaurantListElement.innerHTML = ''; /*restaurant-list 클래스에 적용*/

    if (restaurants.length === 0) { /*음식점 데이터가 없는 경우*/   
        restaurantListElement.innerHTML = '<p style="color: white; text-align: center; grid-column: 1 / -1;">표시할 음식점이 없습니다.</p>'; /*음식점 데이터 없음 출력*/
        return; /*함수 종료*/
    }

    restaurants.forEach((restaurant, index) => { /*음식점 데이터 반복 처리*/
        const card = createRestaurantCard(restaurant, index + 1); /*음식점 카드 생성*/
        restaurantListElement.appendChild(card);
    }); /*음식점 카드 추가*/
}

// 음식점 카드 생성 함수
function createRestaurantCard(restaurant, index) { /*createRestaurantCard 함수 선언*/
    const card = document.createElement('div'); /*음식점 카드 생성*/
    card.className = 'restaurant-card'; /*음식점 카드 클래스 적용*/

    // 데이터 필드 매핑 (API 응답 구조에 따라 다양한 필드명 시도)
    const name = restaurant['상호명'] || restaurant['사업장명'] || restaurant['업소명'] || 
                 restaurant['업체명'] || restaurant['음식점명'] || '이름 없음'; /*음식점 이름 출력*/
    
    const address = restaurant['소재지도로명주소'] || restaurant['소재지'] || 
                   restaurant['주소'] || restaurant['소재지전체주소'] || 
                   restaurant['도로명주소'] || restaurant['지번주소'] || '주소 정보 없음'; /*음식점 주소 출력*/
    
    const phone = restaurant['소재지전화번호'] || restaurant['전화번호'] || 
                 restaurant['연락처'] || restaurant['전화'] || '전화번호 없음'; /*음식점 전화번호 출력*/
    
    const category = restaurant['업태구분명'] || restaurant['업태'] || 
                    restaurant['업종'] || restaurant['음식종류'] || 
                    restaurant['업종명'] || '분류 없음'; /*음식점 분류 출력*/
    
    const menu = restaurant['메뉴'] || restaurant['주메뉴'] || restaurant['주된메뉴'] || '';
    const description = restaurant['설명'] || restaurant['내용'] || restaurant['비고'] || ''; /*음식점 설명 출력*/

    card.innerHTML = ` /*음식점 카드 내용 출력*/
        <h2>${index}. ${name}</h2> /*음식점 이름 출력*/
        <div class="restaurant-info">
            <strong>📍 주소:</strong>
            <span>${address}</span> /*음식점 주소 출력*/
        </div>
        <div class="restaurant-info">
            <strong>📞 전화:</strong>
            <span>${phone}</span> /*음식점 전화번호 출력*/
        </div>
        ${menu ? `
        <div class="restaurant-info">
            <strong>🍴 메뉴:</strong>
            <span>${menu}</span> /*음식점 메뉴 출력*/
        </div>
        ` : ''}
        ${description ? `
        <div class="restaurant-info">
            <strong>📝 설명:</strong>
            <span>${description}</span> /*음식점 설명 출력*/
        </div>
        ` : ''}
        <div class="category">${category}</div> /*음식점 분류 출력*/
    `;

    return card; /*음식점 카드 반환*/
}

// 페이지 로드 시 데이터 가져오기
document.addEventListener('DOMContentLoaded', fetchRestaurants); /*페이지 로드 시 데이터 가져오기*/
