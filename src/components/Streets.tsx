import React, { useEffect, useState } from "react";
import { api, requestData } from "../api/api";
import { IStreet, IRequest, IUserId } from "../api/interface";
import Houses from "./Houses";
import { debounce } from "../helpers/helpers";

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
        `https://dispex.org/api/vtest/Request/streets`,
        { method: "GET" }
      );
      setHousingList(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserId = async () => {
    try {
      const response: IUserId = await api<
        IUserId,
        { Name: string; Phone: number; Email: string }
      >(
        `https://dispex.org/api/vtest/HousingStock/client`,
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

  const debouncedSetUser = debounce(setUser, 5000);
  const debouncedBtnAddUser = debounce(btnAddUser, 5000);

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
      <button onClick={debouncedBtnAddUser} style={{ maxWidth: "250px" }}>
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
            <button onClick={debouncedSetUser}>set user</button>
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
