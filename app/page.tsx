"use client";
import Image from "next/image";
import { io, Socket } from "socket.io-client";
import chef from "@/public/chef.png";
import dish1 from "@/public/dish1.jpg";
import dish2 from "@/public/dish2.jpg";
import dish3 from "@/public/dish3.jpg";
import { FoodCard } from "./components/foodCard";
import { useEffect, useState, useRef } from "react";
import { Stats } from "./components/stats";
import { API_URL } from "./utils/apiUtl";
import ClipLoader from "react-spinners/ClipLoader";

export interface dishDTO {
  dishId: number;
  dishName: string;
  imageUrl: string;
  isPublished?: boolean;
}

export default function Home() {
  const [dishes, setDish] = useState<dishDTO[] | null>(null);
  const [totalDish, setTotalDish] = useState<number>(0);
  const [unPulishedDish, setUnPulishedDish] = useState<number>(0);
  const [publishedDish, setPublishedDish] = useState<number>(0);
  const [isUpdate, setUpdate] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(API_URL);
    }
    socketRef.current.on("statusUpdated", () => {
      setUpdate((prev) => !prev);
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/dish/fetchAll`);
        const response = await res.json();
        console.log(response);
        setDish(response.data);
        setTotalDish(response.data.length);
        setUnPulishedDish(
          response.data.filter((item: any) => item.isPublished === false).length
        );
        setPublishedDish(
          response.data.filter((item: any) => item.isPublished === true).length
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, [isUpdate]);

  return (
    <div className=" min-h-screen flex  font-sans gap-10">
      <div className="left-bar h-[50vh] w-[20%] p-10 relative">
        <div className="container fixed">
          <Image
            src={chef}
            alt="chef"
            className=" w-44 h-44 scale-150 drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] "
          />
        </div>

        <div className="text-center fixed my-64 text-[17px] text-white opacity-80 leading-tight">
          <div className="font-bold">
            <h1>Developed by</h1>
            <span className="font-semibold">Roshan Kumar Patel</span>
          </div>
          <p>
            <a href="mailto:rp207045@gmail.com" className="underline py-2">
              rp207045@gmail.com
            </a>
          </p>
          <p>
            <a
              href="https://patela.vercel.app"
              target="_blank"
              className="underline"
            >
              me.com
            </a>
          </p>
        </div>
      </div>

      <div className="middle w-[60%] mt-10 overflow-hidden">
        <div className="main-frame h-[35vh]">
          <div className="frame-container rounded-3xl flex fixed w-[50%] z-50">
            <div className="content-part m-5">
              <div className="content">
                <h1 className="font-bold text-[35px]">Dish Manager</h1>
                <h1 className="font-bold text-[25px] center">Dashboard</h1>
                <button className="p-4 mt-5 ml-5 w-44 rounded-2xl text-black cursor-pointer hover:bg-white bg-green-400">
                  Explore
                </button>
              </div>
            </div>
            <div className="image relative">
              <Image
                src={dish1}
                alt="chef"
                className="fixed top-30 ml-50 rounded-full bg-yellow-300 flex w-40 h-40 object-cover drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />
              <Image
                src={dish2}
                alt="chef"
                className="fixed top-20 ml-5 rounded-full bg-yellow-300 flex w-40 h-40 object-cover drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />
              <Image
                src={dish3}
                alt="chef"
                className="fixed top-5 ml-30 rounded-full bg-yellow-300 flex w-48 h-48 object-cover drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <ClipLoader size={60} color="#ffffff" />
          </div>
        ) : (
          <div className="items">
            <FoodCard dishes={dishes} />
          </div>
        )}
      </div>

      <div className="right w-[40%]">
        <Stats
          totalDish={totalDish}
          unPulishedDish={unPulishedDish}
          publishedDish={publishedDish}
        />
      </div>
    </div>
  );
}
