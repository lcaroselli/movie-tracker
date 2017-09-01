export const loginHasErred = bool => {
  return {
    type: "LOGIN_HAS_ERRED",
    loginErred: bool
  };
};

export const loginLogoutSuccess = user => {
  return {
    type: "LOGIN_SUCCESS",
    user
  };
};

export const loginLogoutUser = user => {
  return dispatch => {
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status !== 200) {
          dispatch(loginHasErred(true));
        } else {
          return response;
        }
      })
      .then(response => response.json())
      .then(parsedResponse =>
        dispatch(
          loginLogoutSuccess(
            Object.assign(
              {},
              parsedResponse.data,
              { password: "Dont even think about it" },
              { status: parsedResponse.status }
            )
          )
        )
      )
      .catch(() => dispatch(loginHasErred(true)));
  };
};

export const fetchHasErred = bool => {
  return {
    type: "FETCH_HAS_ERRED",
    hasErred: bool
  };
};

export const fetchIsLoading = bool => {
  return {
    type: "FETCH_IS_LOADING",
    isLoading: bool
  };
};

export const fetchDataSuccess = data => {
  return {
    type: "FETCH_DATA_SUCCESS",
    data
  };
};

export const fetchData = url => {
  return dispatch => {
    dispatch(fetchIsLoading(true));

    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          dispatch(fetchHasErred(true));
        }

        dispatch(fetchIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(parsedResponse =>
        dispatch(fetchDataSuccess(parsedResponse.results))
      )
      .catch(() => dispatch(fetchHasErred(true)));
  };
};

export const createUserErred = bool => {
  return {
    type: "CREATE_USER_ERRED",
    createUserErred: bool
  };
};

export const createUser = newUser => {
  return dispatch => {
    fetch("/api/users/new", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status !== 200) {
          dispatch(createUserErred(true));
        } else {
          return response
        }
      })
      .then(response => response.json())
      .then(parsedResponse =>
        dispatch(
          loginLogoutSuccess(
            Object.assign(
              {},
              { name: newUser.name,
                email: newUser.email },
              { password: "Dont even think about it" },
              { status: parsedResponse.status,
                id: parsedResponse.id }
            )
          )
        )
      )
      .catch(() => dispatch(createUserErred(true)));
  };
};
