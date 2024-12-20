"use client";

import React, { useState } from "react";
import service from "../axios";
import { ResponsTypes } from "@/types";
import { notify } from "@/components/ui/toast";

interface EndPointTypes {
  url: string;
  method: string;
  data?: { [key: string]: any };
  sCB?: (res?: any) => void;
  eCB?: (res?: any) => void;
  toast?: boolean;
}

const apiCAll = async (props: EndPointTypes) => {
  /*
	use like this: 
  const {errMess, result, success } = useEndpoint(url, method, data, successCB, errCB)
  */

  let response = {
    errMsg: "",
    result: null,
    success: false,
  };

  function callApi(): ResponsTypes {
    return service({
      url: props.url,
      method: props.method,
      data: props.data,
    });
  }

  try {
    const { error, serverResponse } = await callApi();

    if (!error) {
      props.toast && notify.success(serverResponse.message);
      props.sCB && props.sCB(serverResponse);
      response = {
        ...response,
        errMsg: "",
        result: serverResponse as any,
        success: true,
      };
    }

    if (error) {
      props.toast && notify.error(serverResponse.message);
      props.eCB && props.eCB(serverResponse);
      response = {
        ...response,
        errMsg: serverResponse.message,
        result: null,
        success: false,
      };
    }
  } catch (error: any) {
    console.log(error.message);
  }

  return response;

  //
};

export default apiCAll;
