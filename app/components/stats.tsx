import stat_icon from "@/public/stats.png";
import Image from "next/image";
export const Stats = (props: {
  totalDish: number;
  publishedDish: number;
  unPulishedDish: number;
}) => {
  return (
    <div className="stats m-10 fixed">
      <div className="header flex gap-x-10 bg-black shadow shadow-green-400 m-5 p-5 rounded-md  ">
        <Image src={stat_icon} alt="" className="h-14 w-14 " />
        <div className="head-content">
          <h1 className="font-bold text-3xl">Dashboard</h1>
          <p className="font-bold text-xl">Real-time stats</p>
        </div>
      </div>
      <div className="total-dish m-5 p-5 shadow shadow-pink-400 bg-black hover:mr-10 hover:shadow-yellow-400 cursor-pointer duration-100">
        <h1 className="font-semibold">Total Number of Dishes</h1>
        <span className="text-[20px] font-bold ">{props.totalDish}</span>
      </div>
      <div className="published-dish m-5 p-5 shadow shadow-pink-400 bg-black hover:mr-10 hover:shadow-yellow-400 cursor-pointer duration-100">
        <h1 className="font-semibold text-green-400">Total Published Dishes</h1>
        <span className="text-[20px] font-bold">{props.publishedDish}</span>
      </div>
      <div className="unpulished-dish m-5 p-5 shadow shadow-pink-400 bg-black hover:mr-10 hover:shadow-yellow-400 cursor-pointer duration-100">
        <h1 className="font-semibold text-red-400">Total Unpublished Dishes</h1>
        <span className="text-[20px] font-bold ">{props.unPulishedDish}</span>
      </div>
    </div>
  );
};
