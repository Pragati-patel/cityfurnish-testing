export const endPoints = {
  cityList: "fc-list-values/getAllCities",
  offersAndCupons: "fc-site-offers/getOffersAndCoupons",
  recentlyViewedProduct: "fc-view-products/getRecentlyViewedProducts",
  googleReviews: "fc-google-review-lists/getAllGoogleReviews",
  googleReviewsLinks: cityId =>
    `fc-google-location-data/getUrlToWriteReview?cityId=${cityId}`,
  newlylaunchedProduct: "fc-products/getNewLaunchProducts",
  limitedPreiod: "fc-products/getProductsOnSale",
  trendingProduct: "fc-products/getTrendingProducts",
  productCombos: "fc-products/getCombosProducts",
  category: "fc-categories/all",
  allAndSubCategory: "fc-categories/getAllCategoriesAndSubCategories",
  sidebarMenuLists: "fc-categories/getSidebarMenuLists",
  rentNowBanners: "fc-app-product-urls/getBanners?isHomePage=1",
  trendingSearchConstants: "fc-products/trendingSearchConstants",
  productWithFilter: "fc-products/getProductsWithFilter",
  faqsLandingPage: "fc-faqs/getHomePageFAQS",
  // searchKey: "fc-products/search?searchKey=",
  homePageHappySubscriber:
    "fc-care-instructions/getHomePageHappyCustomerStories",
  homePageTextContent: "fc-admin-settings/getHomePageTextContent",
  cityIdByCityName: "fc-list-values/getCityIdByCityName?cityName=",
  seoApplianceRentalSubCategory:
    "fc-categories/getRentalApplianceSubCategories",
  seoApplianceTtrendingProduct:
    "fc-products/getRentalFurnitureCrowdFavourites?cityId=",
  seoApplianceBanners: "fc-app-product-urls/getBanners?categoryId=26",
  seoApplianceFaqs: "fc-faqs/getSeoApplianceRentalPageFAQS",
  seoApplianceHappyCustomer:
    "fc-care-instructions/getSeoApplianceRentalPageHappyCustomerStories",
  seoAppliancesTextContent: "fc-city-category-seo-data/getSeoPageTextContent",
  seoFurnitureRentalSubCategory: "fc-categories/all",
  seoFurnitureTtrendingProduct:
    "fc-products/getRentalFurnitureCrowdFavourites?cityId=",
  seoFurnitureBanners: "fc-app-product-urls/getBanners?categoryId=27",
  seoFurnitureFaqs: "fc-faqs/getSeoFurnitureRentalPageFAQS",
  seoFurnitureHappyCustomer:
    "fc-care-instructions/getSeoFurnitureRentalPageHappyCustomerStories",
  seoFurnitureTextContent: "fc-city-category-seo-data/getSeoPageTextContent",
  sessionUserUrl: "node-sessions/createSessionData",
  addRecentViewProduct: "fc-view-products/createRecentlyViewedProduct",
  addWishListProduct: "fc-product-likes/addToWishlistProduct",
  deleteWishListProduct: "fc-product-likes/deleteWishlistProduct",
  addressProofList: "fc-cibil-require-docs/getAddressDocLists",
  uploadAddressDocs: "fc-user-uploaded-docs/uploadAddressDocs",
  uploadFinancialDoc: "fc-user-uploaded-docs/uploadFinancialDoc",
  getFinacialDocList: "fc-cibil-require-docs/getFinancialDocLists",
  getAndSaveCibilScore: "fc-crif-scores/getAndSaveCibilScore",

  searchKey: (key = "", cityId = "", sort = "") =>
    `fc-products/search?searchKey=${key}&&cityId=${cityId}&sortKey=${sort}`,

  getCategoryIdBySeoUrl: (key = "") =>
    `fc-categories/getCategoryIdBySeoUrl?seoUrl=${key}`,

  productPage: {
    completeTheLook: (id, cityId) =>
      `fc-products/getRecommendedProducts?productId=${id}&cityId=${cityId}`,
    youMightLike: (id, cityId) =>
      `fc-products/getYouMightAlsoLikeProducts?productId=${id}&cityId=${cityId}`,
    monthlyRent: (id, cityId) =>
      `fc-subproducts/getProductForThePeriod?productId=${id}&cityId=${cityId}`,
    careInstructions: id =>
      `fc-care-instructions/getProductCareInstructions?productId=${id}`,
    bannerImages: id => `fc-product-banners/getProductBanners?productId=${id}`,
    productVideos: id => `fc-product-videos/getProductVideos?productId=${id}`,
    customerReviews: (id, cityId) =>
      `fc-user-reviews/getProductUserReviews?productId=${id}&cityId=${cityId}`,
    qna: id => `fc-faq-products/getProductPageFAQs?productId=${id}`,
    happySubscribers: id =>
      `fc-care-instructions/getCustomerHappyStories?productId=${id}`,
    singleProductDetails: (id, cityId) =>
      `fc-products/getSingleProductDetails?productId=${id}&cityId=${cityId}`,
    addToCart: `fc-shopping-carts/addToCart`,
    notifyAvailability: "fc-notify-user-products/addIntoNotify",
  },

  addToCart: {
    deleteItem: (id, userId) =>
      `fc-shopping-carts/delete?id=${id}&userId=${userId}`,
    fetchCartItems: (cityId, userId) =>
      `fc-shopping-carts/fetchAddToCartItems?cityId=${cityId}&userId=${userId}`,
    updateQuantity: `fc-shopping-carts/updateQuantity`,
    fetchCoins: userId => `fc-my-wallets/getMyWalletDetails?userId=${userId}`,
    fetchBill: "fc-shopping-carts/generatedBill",
    fetchSavedAddress: userId =>
      `fc-shipping-addresses/getUserAllAddress?userId=${userId}`,
    makePrimaryAddress: `fc-shipping-addresses/makeAddressPrimary`,
    addAddress: "fc-shipping-addresses/saveUserAddress",
    checkCouponApplicability: "fc-couponcards/checkCoupon",
    makePayment: "fc-payments/makePayment",
    successPayment: "fc-payments/postPaymentSuccess",
  },

  yourAddressPage: {
    deleteAddress: id => `fc-shipping-addresses/delete?id=${id}`,
    updateAddress: `fc-shipping-addresses/update`,
  },

  profileSettingPage: {
    getUserDetails: userId => `fc-users/getUserDetails?userId=${userId}`,
    updateUserDetails: `fc-users/updateUserDetails`,
    sentOtpToEmail: `user/verifyemail`,
    sentOtpToNumber: "user/sendotp_new",
    verifyOtp: "user/onlyotpverify",
  },

  kycPage: {
    getOrderIds: userId => `fc-payments/getAllOrders?userId=${userId}`,
    getKycTrack: (userId, orderId) =>
      `fc-crif-scores/getKYCStage?userId=${userId}&orderId=${orderId}`,
  },
  // categoryHappySubscriber:
  //   "fc-care-instructions/getCategoryPageHappyCustomerStories",

  categoryHappySubscriber: id =>
    `fc-care-instructions/getCategoryPageHappyCustomerStories?parentCategoryId=${id}`,
  categortFaq: "fc-faqs/getCategoryPageFAQS",
  categoryContent: "fc-city-category-datas/getCategoryPageTextContent",
  savedItems: "fc-product-likes/getWishlistProducts",
  categorySingleProduct: "fc-products/getCategoryProducts",
  categoryComboProduct: "fc-products/getSetProducts",
  categoryStockOutProduct: "fc-products/getOutOfStockProducts",
  categoryFilterOption: "fc-products/getProductFilters",
  categoryInstruction: "fc-care-instructions/getProductCareInstructions",
  referAFreind: id => `fc-referral-codes/getReferralCode?userId=${id}`,

  enquiry: "fc-bulk-orders/submitEnquiryForm",
  feedback: "ivr-feedbacks/saveFeedback",
};
