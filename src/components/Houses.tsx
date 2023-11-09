import React, { useState } from "react";
import { IAdress, IStreet, IRequest } from "../api/interface";
import { api, requestData } from "../api/api";
import HousingStock from "./HousingStock";

function Houses({ item, userId }: { item: IStreet; userId: string[] }) {
  let [listItem, setListItem] = useState<IAdress[] | []>([]);
  let [isOpenList, setIsOpenList] = useState<Boolean>(false);
  const fetchDataHousesList = async () => {
    try {
      const response: IAdress[] = await api<IAdress[]>(
        `https://dispex.org/api/vtest/request/houses/${item.id}`,
        { method: "GET" }
      );
      setListItem(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleclickHouseItem = () => {
    setIsOpenList(!isOpenList);
    if (listItem) {
      fetchDataHousesList();
    }
  };

  return (
    <div>
      <div key={item.id} onClick={handleclickHouseItem}>
        {item.prefix.name}. {item.name}, {item.cityId}
      </div>
      {isOpenList
        ? listItem.length !== 0
          ? listItem.map((houseItem) => (
              <div key={houseItem.id}>
                {
                  <HousingStock
                    idHouse={houseItem.id}
                    idStreet={item.id}
                    userId={userId}
                  />
                }
              </div>
            ))
          : "Loading..."
        : null}
    </div>
  );
}

export default Houses;
