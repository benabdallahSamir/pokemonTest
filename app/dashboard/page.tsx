"use client";
import ChartComponent from "@/components/Charr";
import Loading from "@/components/Loading";
import { getPokemonDashboard } from "@/requests/request";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const page = () => {
  const [loading, setLodingState] = useState(true);
  const [data, setData] = useState<any>(null);
  const [baseExperience, setBaseExperience] = useState<number[] | null>(null);
  const [label, setLabel] = useState<string[] | null>(null);
  const [abilities, setAbilities] = useState<number[] | null>(null);
  useEffect(() => {
    (async function () {
      setLodingState(true);
      const { types } = (await getPokemonDashboard()) as any;
      if (!types) {
        Swal.fire({
          title: "error!!!",
          text: "internal server error",
          icon: "error",
        });
      }
      setData(types);
      setLodingState(false);
    })();
  }, []);
  useEffect(() => {
    if (data) {
      const labels = [] as string[];
      const abilityData = [] as number[];
      const baseExperienceData = [] as number[];
      Object.keys(data).forEach((type) => {
        labels.push(type);
        abilityData.push(data[type].ability);
        baseExperienceData.push(data[type].baseExperience);
      });
      setLabel(labels);
      setAbilities(abilityData);
      setBaseExperience(baseExperienceData);
      setLodingState(false);
    }
  }, [data]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="py-10 flex justify-evenly items-center flex-col md:flex-row">
          {abilities && label && baseExperience ? (
            <>
              <ChartComponent
                data={abilities as number[]}
                title="abilities"
                labels={label as string[]}
              />
              <ChartComponent
                data={baseExperience as number[]}
                title="base experience"
                labels={label as string[]}
              />
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default page;
