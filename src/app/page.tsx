"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CollegeCard from "@/components/CollegeCard";
import { colleges } from "@/data/colleges";

export default function Home() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);


  const [sortOrder, setSortOrder] = useState("asc");
  const [locationFilter, setLocationFilter] = useState("");
  const [compareList, setCompareList] = useState<number[]>([]);

 const filteredColleges = colleges.filter((college) => {
  const matchesSearch = college.name
    .toLowerCase()
    .includes(search.toLowerCase());

    const matchesLocation =
    locationFilter === "" ||
    college.location === locationFilter;

    return matchesSearch && matchesLocation;
  });

  const sortedColleges = [...filteredColleges].sort((a, b) =>
    sortOrder === "asc"
      ? a.ranking - b.ranking
      : b.ranking - a.ranking
  );

  const toggleCompare = (id: number) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter((item) => item !== id));
    } else if (compareList.length < 2) {
      setCompareList([...compareList, id]);
    }
  };
  
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        />
        
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded mb-4"
        >
          <option value="asc">Best Ranking First</option>
          <option value="desc">Worst Ranking First</option>
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border p-2 rounded mb-4 ml-2"
        >
          <option value="">All Locations</option>
          <option value="New Delhi">New Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
        </select>

        <div className="mb-4">
          Compare Selected: {compareList.length}/2
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {sortedColleges.map((college) => (
            <CollegeCard
              key={college.id}
              id={college.id}
              name={college.name}
              location={college.location}
              ranking={college.ranking}
              image={college.image}
              isFavorite={favorites.includes(college.id)}
              onFavorite={toggleFavorite}
            />
          ))}
        </div>

        <div className="mb-4 font-semibold">
          Favorites: {favorites.length}
        </div>
      </main>
    </>
  );
}