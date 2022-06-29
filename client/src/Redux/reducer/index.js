import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  CLEAR_USER_DETAIL,
  FILTER_USERS_BY_GENDER,
  GET_USER_BY_NICKNAME,
  /*  GET_USER_BY_GENDER,
  GET_USER_BY_GENDERINT, */
} from "../actions/types.js";

const initialState = {
  users: [], //NO MODIFICAR
  usersSelected: [], //USADO PARA FILTERS & SORTERS
  userDetail: [], //USADO TAMBIEN PARA CLEAR_USER_DETAIL
  usersBackup: [],
  // OPCIONALES?
  // message: [], //POR EJ:AQUI  GUARDE LA RESPUESTA DEL SERVIDOR DESPUES DEL POST Y EL PUT
  gender: [],
  genderInt: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        users: action.payload,
        usersSelected: action.payload,
        usersBackup: action.payload,
      };
    }

    case CREATE_USER: {
      return { ...state, userDetail: action.payload };
    }

    //   return { ...state, message: action.payload, userDetail: action.payload };
    // } //MESSAGE PODRIA TRAER INFO PARA UN COMPONENTE MODAL DE NOTIFICACION

    case UPDATE_USER: {
      return { ...state, message: action.payload };
    }

    case CLEAR_USER_DETAIL: {
      return { ...state, userDetail: [] };
    }

    case FILTER_USERS_BY_GENDER: {
      const allusersGender = state.usersBackup;
      const usersFilterByGender =
        action.payload === "both"
          ? allusersGender
          : action.payload === "male"
          ? allusersGender.filter((e) => e.gender === "male")
          : allusersGender.filter((e) => e.gender === "female");
      return { ...state, usersSelected: usersFilterByGender };
    }

    case GET_USER_BY_NICKNAME: {
      const allusersNick = state.usersBackup;
      const usersFilterNick = allusersNick.find(
        (user) => user.nickname === action.payload
      );
      return { ...state, userDetail: usersFilterNick };
    }

    default:
      return state;
  }
}
