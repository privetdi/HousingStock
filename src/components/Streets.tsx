import React, { useEffect, useState } from "react";
import { api, requestData } from "../api/api";
import { IStreet, MyRequest, UserId } from "../api/interface";
import Houses from "./Houses";

export const PROXY = "https://dispex.org/api/vtest/";
export const PROXYoff = "";

function Streets() {
  let [housingList, setHousingList] = useState<IStreet[] | []>([]);
  let [name, setName] = useState<string>("");
  let [email, setEmail] = useState<string>("");
  let [phone, setPhone] = useState<number>(0);
  let [userId, setUserId] = useState<string[]>([]);
  let [isViewInput, setShowInput] = useState<boolean>(false);

  const fetchDataStreetList = async () => {
    try {
      const response: IStreet[] = await api<IStreet[]>(
        `${PROXY}Request/streets`,
        { method: "GET" }
      );
      setHousingList(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserId = async () => {
    try {
      const response: UserId = await api<
        UserId,
        { Name: string; Phone: number; Email: string }
      >(
        `${PROXY}HousingStock/client`,
        { method: "POST" },
        {
          Name: name,
          Phone: phone,
          Email: email,
        }
      );
      setUserId((users) => {
        return [...users, "" + response.id];
      });
    } catch (error) {
      console.error(error);
    }
  };
  const setUser = () => {
    getUserId();
    setShowInput(false);
  };

  const btnAddUser = (e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    setShowInput(true);
  };
  useEffect(() => {
    fetchDataStreetList();
  }, []);

  const onChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const onChangePhone = (e: React.FormEvent<HTMLInputElement>) => {
    setPhone(+e.currentTarget.value);
  };
  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button onClick={btnAddUser} style={{ maxWidth: "250px" }}>
        add user
      </button>
      {isViewInput ? (
        <div>
          ======================New User======================
          <div>
            <input
              onChange={(e) => {
                onChangeName(e);
              }}
              type="text"
              placeholder="name"
            ></input>
            <input
              onChange={(e) => {
                onChangePhone(e);
              }}
              type="phone"
              placeholder="phone"
            ></input>
            <input
              onChange={(e) => {
                onChangeEmail(e);
              }}
              type="email"
              placeholder="email"
            ></input>
            <button onClick={setUser}>set user</button>
          </div>
          ===================================================
        </div>
      ) : null}
      {housingList.length !== 0
        ? housingList.map((item) => {
            return (
              <div>
                <Houses item={item} userId={userId} />{" "}
              </div>
            );
          })
        : "Loading..."}
    </div>
  );
}

export default Streets;
