import React, { useEffect, useState } from "react";
import { api, requestData } from "../api/api";
import { Housing, IStreet, MyRequest, UserId } from "../api/interface";
import HouseFlats from "./HouseFlats";
import { PROXY } from "./Streets";

function HousingStock({
  idStreet,
  idHouse,
  userId,
}: {
  idStreet: number;
  idHouse: number;
  userId: string[];
}) {
  let [housingList, setHousingList] = useState<Housing[] | []>([]);
  let [isOpenList, setIsOpenList] = useState<Boolean>(false);

  const fetchDataHousingList = async (idStreet: number, idHouse: number) => {
    try {
      const response: Housing[] = await api<Housing[], MyRequest>(
        `${PROXY}HousingStock?companyId=1&streetId=${idStreet}&houseId=${idHouse}`,
        { method: "GET" }
      );
      setHousingList(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleclickHouseItem = (idStreet: number, idHouse: number) => {
    setIsOpenList(!isOpenList);
    if (housingList.length === 0) fetchDataHousingList(idStreet, idHouse);
  };

  return (
    <div
      onClick={() => handleclickHouseItem(idStreet, idHouse)}
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "20px",
        maxWidth: "150px",
      }}
    >
      дом {idHouse}
      {isOpenList
        ? housingList.length !== 0
          ? housingList.map((item, index) => (
              <HouseFlats item={item} userId={userId} />
            ))
          : " Loading..."
        : null}
    </div>
  );
}

export default HousingStock;
