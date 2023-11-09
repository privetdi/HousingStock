import React, { useState } from "react";
import { api } from "../api/api";
import { IHouseUser, IHousing } from "../api/interface";
import { debounce } from "../api/helpers";

function HouseFlats({ item, userId }: { item: IHousing; userId: string[] }) {
  let [viewUserList, setViewUserList] = useState<Boolean>(true);
  let [userHouseList, setUserHouseList] = useState<IHouseUser[]>([]);

  const fetchSetUserHouse = async (id: string, idHouse: number) => {
    try {
      const response = await api<null, { AddressId: number; ClientId: string }>(
        `https://dispex.org/api/vtest/HousingStock/bind_client`,
        { method: "PUT" },
        { AddressId: idHouse, ClientId: id }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUserHouse = async (id: number) => {
    try {
      const response: IHouseUser[] = await api<IHouseUser[]>(
        `https://dispex.org/api/vtest/HousingStock/clients?addressId=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json-patch+json" },
        }
      );
      setUserHouseList(response);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDeletUser = async (id: number) => {
    try {
      const response: IHouseUser[] = await api<IHouseUser[]>(
        `https://dispex.org/api/vtest/HousingStock/bind_client/${id}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error(error);
    }
    const newArr = userHouseList.filter((item) => item.id !== id);
    setUserHouseList(newArr);
  };

  const setHouseUser = (idUser: string, idHouse: number) => {
    fetchSetUserHouse(idUser, idHouse);
    fetchUserHouse(idHouse);
  };
  const getHouseUsers = (id: number) => {
    fetchUserHouse(id);
  };
  const delUser = (id: number) => {
    fetchDeletUser(id);
  };

  const debounceSetHouseUser = debounce(setHouseUser, 5000);
  const debouncedGetHouseUsers = debounce(getHouseUsers, 5000);
  const debouncedDelUser = debounce(delUser, 5000);

  return (
    <div style={{ border: "solid 1px black", width: "180px" }}>
      <div
        onClick={(e) => e.stopPropagation()}
        key={item.addressId}
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          Ул {item.streetName} дом {item.houseId} кв {item.flat}
        </div>
        <div>
          <button onClick={() => debouncedGetHouseUsers(item.addressId)}>
            список жильцов данного дома
          </button>
          {item.clients.length === 0
            ? userHouseList.map((item) => {
                return (
                  <div>
                    ФИО {item.name} id {item.id}
                    <button onClick={() => debouncedDelUser(item.id)}>
                      del
                    </button>
                  </div>
                );
              })
            : item.clients.length}{" "}
        </div>

        <button
          onClick={() => {
            setViewUserList(!viewUserList);
          }}
        >
          списко доступных жильцов на заселение
        </button>
        {!viewUserList
          ? userId.length !== 0
            ? userId.map((user) => (
                <button
                  key={user}
                  onClick={() => debounceSetHouseUser(user, item.addressId)}
                >
                  заселить ID{user}
                </button>
              ))
            : "Жильцы не найдены, нажмите add user для добавления пользователей в список"
          : null}
      </div>
    </div>
  );
}

export default HouseFlats;
