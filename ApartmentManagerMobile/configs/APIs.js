import axios from "axios";

// const BASE_URL = 'https://nguyenhuytan.pythonanywhere.com/';

const BASE_URL = 'http://192.168.1.21:8000/';

// const BASE_URL = 'http://localhost:8000/';

export const endpoints = {
    'users': '/users/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'update-Profile':(id) => `/users/${id}/update-current-user/`,
    'add-user': '/users/add-user/',
    'feedbacks': '/feedbacks/',
    'add-feedback': '/feedbacks/add-feedback/',
    'register-access':(id) => `/users/${id}/register-access-card/`,
    'delete-user':(id) => `/users/${id}/delete-user/`,
    //Thẻ ra vào
    'get-access': '/residentfamiles/',
    'update-card':(id) => `/residentfamiles/${id}/update-family-status/`,
    //Dịch vụ
    'add-service': '/services/add-service/',
    'services': '/services/',
    //Khảo sát
    'surveys': '/surveys/',
    'surveyTitle': '/surveys/add-title/',
    'surveyquestions': '/surveyquestions/',
    'surveyquestion': `/surveyquestions/add-question/`,
    'surveyAnswer': '/surveyanswers/add-answer/',
    'getSurveyAnswer': '/surveyanswers/',
    //Thông báo
    'notification': '/notifications/',
    'notifications': '/notifications/add-notification/',

    // Tủ đồ
    'tudos': '/tudos/',
    'add-tudo': '/tudos/add-TuDo/',
    'add-package':(id) => `/tudos/${id}/add-Packages/`,
    
    // Hóa Đơn
    'bills': '/bills/',
    'add-bill': '/bills/add-bills/',
    'get-bill':(id) => `/bills/${id}/`,
    'update-bill':(id) => `/bills/${id}/update-bill/`,
    'delete-bill':(id) => `/bills/${id}/delete-bill/`,
    // Package
    'get-package': '/packages/',
    'update-package':(id) => `/packages/${id}/update-package-status/`,
    'delete-package': (id) => `/packages/${id}/delete-package/`,
};

export const authAPI = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
});
