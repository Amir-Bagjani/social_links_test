import { createContext, useEffect, useReducer } from "react";
import Axios from "axios";

export type Links = {
  id: number | string;
  network: string;
  social_id: string;
  social_link: string;
};
type LinkContextProviderProps = {
  children: React.ReactNode;
};
type InitialStateType = {
  links: Links[];
  selectLinkId: number | string ;
  refresh: boolean;
};
type ActionType =
  | { type: "FIRST_TIME"; payload: Links[] }
  | { type: "DELETE_LINK"; payload: number | string  }
  | { type: "ADD_LINK" }
  | { type: "EDIT_LINK"; payload: Links }
  | { type: "SELECT_ID"; payload: number | string  }

type LinkContextType = {
  state: InitialStateType;
  dispatch: React.Dispatch<ActionType>;
};

const initialState: InitialStateType = {
  links: [],
  selectLinkId: 0,
  refresh: false
};

export const LinkContext = createContext({} as LinkContextType);

export const linkReducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case "FIRST_TIME":
      return { ...state, links: [...action.payload] };

    case "DELETE_LINK":
      return {...state, links: [...state.links.filter((i) => i.id != action.payload)]};

    case "ADD_LINK":
        //در ویدئو گفته شد که آیدی ندهیم، ناچارا باید عملیات فچ را دوباره انجام بدهیم تا بتوانیم از سرور آیدی را دریافت کنیم
      return { ...state, refresh: !state.refresh };

    case "EDIT_LINK":
      return {...state, links: [...state.links.map((i) => i.id === action.payload.id ? {...action.payload } : i)]};

    case "SELECT_ID":
      return { ...state, selectLinkId: action.payload };

    default:
      return state;
  }
};

export const LinkContextProvider: React.FC<LinkContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(linkReducer, initialState);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await Axios.get(`http://localhost:3030/socials`, {
          cancelToken: Axios.CancelToken.source().token,
        });
        dispatch({ type: "FIRST_TIME", payload: res.data });
      } catch (err) {
        if (Axios.isCancel(err)) {
          console.log(`fetch aborted`);
        } else {
          console.log(err);
          alert(`لطفا جیسون سرور را به صورت گلوبال بر سیستم نصب کنید سپس در ترمینال دایرکتوری پروژه دستور زیر ر ا وارد کنید
          json-server --watch db.json --port 3030`);
        }
      }

    };
    getData();
    return () => Axios.CancelToken.source().cancel();
  }, [state.refresh]);


  return (
    <>
      <LinkContext.Provider value={{ state, dispatch }}>
        {children}
      </LinkContext.Provider>
    </>
  );
};
