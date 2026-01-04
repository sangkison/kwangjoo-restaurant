import { useState, useEffect } from 'react'
import './App.css'

// API 설정
const API_BASE_URL = 'https://api.odcloud.kr/api/3083730/v1/uddi:6b8d6f79-21df-434b-aca1-d1c4477b3835'
const API_KEY = '23db91f19823a8f94280869655ce25dce78b0954d36416a4a62464e17134670f'
const ITEMS_PER_PAGE = 12 // 한 번에 보여줄 항목 수 (3열 4행 = 12개)

function App() {
  const [restaurants, setRestaurants] = useState([]) // 모든 음식점 데이터
  const [searchQuery, setSearchQuery] = useState('') // 검색어
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE) // 현재 표시된 개수
  const [loading, setLoading] = useState(true) // 로딩 상태
  const [error, setError] = useState(null) // 에러 상태

  // API 호출하여 모든 음식점 데이터 가져오기
  useEffect(() => {
    async function fetchAllRestaurants() {
      try {
        setLoading(true)
        setError(null)

        let allRestaurants = []
        let page = 1
        let hasMore = true
        const perPage = 100 // 페이지당 가져올 개수

        // 모든 페이지를 순차적으로 가져오기
        while (hasMore) {
          const url = `${API_BASE_URL}?page=${page}&perPage=${perPage}&serviceKey=${API_KEY}`
          
          const response = await fetch(url)
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()
          
          if (data.data && Array.isArray(data.data)) {
            if (data.data.length > 0) {
              allRestaurants = [...allRestaurants, ...data.data]
              // 현재 페이지의 데이터가 perPage보다 적으면 마지막 페이지
              if (data.data.length < perPage) {
                hasMore = false
              } else {
                page++
              }
            } else {
              hasMore = false
            }
          } else {
            // 첫 페이지에서 데이터 형식이 잘못된 경우에만 에러
            if (page === 1) {
              throw new Error('데이터 형식이 올바르지 않습니다.')
            } else {
              hasMore = false
            }
          }
        }

        setRestaurants(allRestaurants)
        console.log(`총 ${allRestaurants.length}개의 음식점 데이터를 불러왔습니다.`)

      } catch (err) {
        console.error('Error fetching restaurants:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAllRestaurants()
  }, [])

  // 검색어로 필터링된 음식점 목록
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (!searchQuery.trim()) return true // 검색어가 없으면 전체 표시

    const searchLower = searchQuery.toLowerCase().trim()
    
    // 이름, 주소, 전화번호, 카테고리, 메뉴, 설명에서 검색
    const name = (restaurant['상호명'] || restaurant['사업장명'] || restaurant['업소명'] || 
                  restaurant['업체명'] || restaurant['음식점명'] || '').toLowerCase()
    const address = (restaurant['소재지도로명주소'] || restaurant['소재지'] || 
                     restaurant['주소'] || restaurant['소재지전체주소'] || 
                     restaurant['도로명주소'] || restaurant['지번주소'] || '').toLowerCase()
    const phone = (restaurant['소재지전화번호'] || restaurant['전화번호'] || 
                   restaurant['연락처'] || restaurant['전화'] || '').toLowerCase()
    const category = (restaurant['업태구분명'] || restaurant['업태'] || 
                      restaurant['업종'] || restaurant['음식종류'] || 
                      restaurant['업종명'] || '').toLowerCase()
    const menu = (restaurant['메뉴'] || restaurant['주메뉴'] || restaurant['주된메뉴'] || '').toLowerCase()
    const description = (restaurant['설명'] || restaurant['내용'] || restaurant['비고'] || '').toLowerCase()

    return name.includes(searchLower) || 
           address.includes(searchLower) || 
           phone.includes(searchLower) || 
           category.includes(searchLower) || 
           menu.includes(searchLower) || 
           description.includes(searchLower)
  })

  // 검색어가 변경되면 표시 개수를 초기화
  useEffect(() => {
    setDisplayedCount(ITEMS_PER_PAGE)
  }, [searchQuery])

  // 더 보기 버튼 클릭 핸들러
  const handleLoadMore = () => {
    setDisplayedCount(prev => prev + ITEMS_PER_PAGE)
  }

  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // 현재 표시할 음식점 목록 (필터링된 결과에서)
  const displayedRestaurants = filteredRestaurants.slice(0, displayedCount)
  const hasMore = displayedCount < filteredRestaurants.length

  return (
    <div className="container">
      <header>
        <h1>🍽️ 광주광역시 서구 음식점 추천</h1>
        <p>공공데이터 API를 활용한 맛집 리스트</p>
      </header>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>데이터를 불러오는 중...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>데이터를 불러오는데 실패했습니다: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* 검색 입력 필드 */}
          <div className="search-container">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="음식점 이름, 주소, 카테고리, 메뉴 등을 검색하세요..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button 
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="검색어 지우기"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="search-results-info">
                검색 결과: <strong>{filteredRestaurants.length}</strong>개
              </div>
            )}
          </div>

          {/* 검색 결과가 없을 때 */}
          {searchQuery && filteredRestaurants.length === 0 && (
            <div className="no-results">
              <p>"{searchQuery}"에 대한 검색 결과가 없습니다.</p>
              <button 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                검색어 지우기
              </button>
            </div>
          )}

          {/* 음식점 목록 */}
          {(!searchQuery || filteredRestaurants.length > 0) && (
            <div className="restaurant-list">
              {displayedRestaurants.map((restaurant, index) => (
                <RestaurantCard 
                  key={index} 
                  restaurant={restaurant} 
                  index={index + 1} 
                />
              ))}
            </div>
          )}

          {/* 더 보기 버튼 */}
          {hasMore && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={handleLoadMore}>
                더 보기 ({filteredRestaurants.length - displayedCount}개 남음)
              </button>
            </div>
          )}

          {/* 모든 항목 표시 완료 */}
          {!hasMore && filteredRestaurants.length > 0 && (
            <div className="load-more-container">
              <p className="no-more">
                {searchQuery 
                  ? `검색 결과를 모두 표시했습니다. (검색 결과 ${filteredRestaurants.length}개)` 
                  : `모든 음식점을 표시했습니다. (총 ${restaurants.length}개)`
                }
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// 음식점 카드 컴포넌트
function RestaurantCard({ restaurant, index }) {
  // 데이터 필드 매핑 (API 응답 구조에 따라 다양한 필드명 시도)
  const name = restaurant['상호명'] || restaurant['사업장명'] || restaurant['업소명'] || 
               restaurant['업체명'] || restaurant['음식점명'] || '이름 없음'
  
  const address = restaurant['소재지도로명주소'] || restaurant['소재지'] || 
                 restaurant['주소'] || restaurant['소재지전체주소'] || 
                 restaurant['도로명주소'] || restaurant['지번주소'] || '주소 정보 없음'
  
  const phone = restaurant['소재지전화번호'] || restaurant['전화번호'] || 
               restaurant['연락처'] || restaurant['전화'] || '전화번호 없음'
  
  const category = restaurant['업태구분명'] || restaurant['업태'] || 
                  restaurant['업종'] || restaurant['음식종류'] || 
                  restaurant['업종명'] || '분류 없음'
  
  const menu = restaurant['메뉴'] || restaurant['주메뉴'] || restaurant['주된메뉴'] || ''
  const description = restaurant['설명'] || restaurant['내용'] || restaurant['비고'] || ''

  // 지도 링크 생성 함수
  const handleMapClick = (mapType) => {
    if (address === '주소 정보 없음') {
      alert('주소 정보가 없어 지도를 열 수 없습니다.')
      return
    }

    const searchQuery = encodeURIComponent(`${name} ${address}`)
    
    let mapUrl = ''
    if (mapType === 'kakao') {
      // 카카오맵 검색 링크
      mapUrl = `https://map.kakao.com/link/search/${searchQuery}`
    } else if (mapType === 'google') {
      // 구글맵 검색 링크
      mapUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`
    } else if (mapType === 'naver') {
      // 네이버맵 검색 링크
      mapUrl = `https://map.naver.com/v5/search/${searchQuery}`
    }
    
    if (mapUrl) {
      window.open(mapUrl, '_blank')
    }
  }

  return (
    <div className="restaurant-card">
      <h2>{index}. {name}</h2>
      <div className="restaurant-info">
        <strong>📍 주소:</strong>
        <span>{address}</span>
      </div>
      <div className="restaurant-info">
        <strong>📞 전화:</strong>
        <span>{phone}</span>
      </div>
      {menu && (
        <div className="restaurant-info">
          <strong>🍴 메뉴:</strong>
          <span>{menu}</span>
        </div>
      )}
      {description && (
        <div className="restaurant-info">
          <strong>📝 설명:</strong>
          <span>{description}</span>
        </div>
      )}
      <div className="category">{category}</div>
      
      {/* 지도 버튼 영역 */}
      {address !== '주소 정보 없음' && (
        <div className="map-buttons">
          <button 
            className="map-btn kakao-map-btn" 
            onClick={() => handleMapClick('kakao')}
            title="카카오맵에서 보기"
          >
            🗺️ 카카오맵
          </button>
          <button 
            className="map-btn google-map-btn" 
            onClick={() => handleMapClick('google')}
            title="구글맵에서 보기"
          >
            🗺️ 구글맵
          </button>
        </div>
      )}
    </div>
  )
}

export default App
