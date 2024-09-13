import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="cursor" onClick={() => removeFood(item._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  className="Social-image"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.3333 4.65479H21.6667C22.403 4.65479 23 5.25175 23 5.98812V7.65479H28.6667C29.4031 7.65479 30 8.25175 30 8.98812C30 9.72449 29.4031 10.3215 28.6667 10.3215H4.33333C3.59696 10.3215 3 9.72449 3 8.98812C3 8.25175 3.59696 7.65479 4.33333 7.65479H10V5.98812C10 5.25175 10.597 4.65479 11.3333 4.65479ZM6.66667 11.6548H26.3333C27.0697 11.6548 27.6667 12.2518 27.6667 12.9881C27.6667 13.7245 27.0697 14.3215 26.3333 14.3215H25.5467L24.9333 24.3215C24.9333 26.9761 22.7882 28.6548 20.1333 28.6548H12.8667C10.2118 28.6548 8.06667 26.9761 8.06667 24.3215L7.45333 14.3215H6.66667C5.9303 14.3215 5.33333 13.7245 5.33333 12.9881C5.33333 12.2518 5.9303 11.6548 6.66667 11.6548ZM11.4533 24.3215C11.4533 24.9761 11.9772 25.4881 12.6333 25.4881H20.3667C21.0228 25.4881 21.5467 24.9761 21.5467 24.3215L22.1067 14.3215H9.89333L10.4533 24.3215Z"
                    fill="#000000d1"
                  />
                </svg>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
