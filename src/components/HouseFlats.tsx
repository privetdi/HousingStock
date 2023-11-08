import React, { useState } from "react";
import { api } from "../api/api";
import { HouseUser, Housing } from "../api/interface";
import { PROXY } from "./Streets";

function HouseFlats({ item, userId }: { item: Housing; userId: string[] }) {
  let [viewUserList, setViewUserList] = useState<Boolean>(true);

  const fetchSetUserHouse = async (id: string, idHouse: number) => {
    try {
      const response = await api<null, { AddressId: number; ClientId: string }>(
        `${PROXY}HousingStock/client`,
        { method: "POST" },
        { AddressId: idHouse, ClientId: id }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUserHouse = async (id: number) => {
    try {
      const response: HouseUser[] = await api<HouseUser[]>(
        `${PROXY}HousingStock/clients?addressId=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json-patch+json" },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const setHouseUser = (idUser: string, idHouse: number) => {
    fetchSetUserHouse(idUser, idHouse);
  };
  const getHouseUsers = (id: number) => {
    fetchUserHouse(id);
  };
  return (
    <div>
      <div
        onClick={(e) => e.stopPropagation()}
        key={item.addressId}
        style={{
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          Ул {item.streetName} дом {item.houseId} кв {item.flat}
        </div>
        <div>
          <button onClick={() => getHouseUsers(item.addressId)}>
            список жильцов
          </button>
          проживает users: {item.clients.length === 0 ? 0 : item.clients.length}{" "}
        </div>

        <button
          onClick={() => {
            setViewUserList(!viewUserList);
          }}
        >
          заселить user
        </button>
        {!viewUserList
          ? userId.length !== 0
            ? userId.map((user) => (
                <button
                  key={user}
                  onClick={() => setHouseUser(user, item.addressId)}
                >
                  заселить ID{user}
                </button>
              ))
            : "Пользователей не найдено"
          : null}
      </div>
    </div>
  );
}

export default HouseFlats;
