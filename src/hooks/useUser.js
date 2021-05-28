import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

// 2. make query 
const ME_QUERY = gql`
    query me {
        me {
            username
            avatar
        }
    }
`


function useUser(){
    // 1. check if user logged in
    const hasToken = useReactiveVar(isLoggedInVar);

    // skip this query if user is not logged in with localStorage Token
    const {data} = useQuery(ME_QUERY, {
        skip: !hasToken
    });
    console.log(data);
    useEffect(()=> {
        if(data?.me === null) {
            console.log("There is a token on localStorage but not working on back-end");
            logUserOut();
        }
    },[data])

    return;
}

export default useUser;