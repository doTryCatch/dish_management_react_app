"use client";

import Image from "next/image";
import { dishDTO } from "../page";
import { toast } from "react-toastify";
import { API_URL } from "../utils/apiUtl";

export const FoodCard = ({ dishes }: { dishes: dishDTO[] | null }) => {
  const handleUpdate = async (id: number, status: boolean) => {
    try {
      await fetch(`${API_URL}/api/dish/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dishId: id,
          isPublished: status,
        }),
      });
      toast.success("update the dish status!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="foodCard my-24 grid grid-cols-3 grid-rows-auto gap-x-2 gap-y-24 ">
      {dishes &&
        dishes.map((item, index) => (
          <div
            className={
              "ml-10  card-container  top-0 hover:top-[-20px] transition-all duration-300 ease-out w-[24vh] bg-black shadow-md rounded-xl " +
              (item.isPublished ? "shadow-green-400" : "shadow-red-400")
            }
            key={index}
          >
            <div className="image center aspect-square w-full overflow-hidden rounded-full -z-10 ">
              <Image
                src={item.imageUrl}
                alt=""
                width={400}
                height={400}
                className="  object-cover w-[80%] h-[80%] rounded-full shadow-md shadow-white "
              />
            </div>

            <div className="dish-content text-center ">{item.dishName}</div>
            <div className="status   center">
              <div
                className={
                  "outline-green border  p-1 px-4 rounded-3xl center gap-x-2 " +
                  (item.isPublished ? "border-green-400" : "border-red-400")
                }
              >
                <div
                  className={
                    "dot w-3 h-3 rounded-full " +
                    (item.isPublished ? "bg-green-500" : "bg-red-500")
                  }
                ></div>
                {item.isPublished ? "Live" : "Not Live Yet"}
              </div>
            </div>
            <div className="center">
              <p
                className=" px-2 py-1 my-2 bg-orange-600 rounded-md cursor-pointer hover:scale-105 "
                onClick={() => handleUpdate(item.dishId, !item.isPublished)}
              >
                {item.isPublished ? "Un Publish" : "Publish"}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
