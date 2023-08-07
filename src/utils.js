import Cap from "./assets/Images/cap.jpg";
import Clothes from "./assets/Images/clothes.jpg";
import Shoes from "./assets/Images/Shoes.jpg";
import TV from "./assets/Images/TV.jpg";
import Avatar from "./assets/Images/avatar.jpg";
import axios from "axios";

export const API_URL = "http://127.0.0.1:8000";

export const http = axios.create({
  baseURL: API_URL,
});

export const students = [
  {
    id: 1,
    name: "Melony Cartwright",
    avatar: Avatar,
    earned: 3,
    value: 3,
    progress: {
      type: "behavior",
      point: 1,
      goal: 3,
    },
    image: Shoes,
    status: "active",
    action: "message+",
  },
  {
    id: 2,
    name: "Jhon Singer",
    avatar: Avatar,
    earned: 3,
    value: 3,
    progress: {
      type: "academic",
      point: 3,
      goal: 5,
    },
    image: TV,
    status: "active",
    action: "remove",
  },
  {
    id: 3,
    name: "Song Lee",
    avatar: Avatar,
    earned: 4,
    value: 5,
    progress: {
      type: "academic",
      point: 4,
      goal: 5,
    },
    image: Cap,
    status: "active",
    action: "message",
  },
  {
    id: 4,
    name: "Pham Row",
    avatar: Avatar,
    earned: 1,
    progress: {
      type: "parent",
      point: 1,
      goal: 5,
    },
    value: 3,
    image: Clothes,
    status: "active",
    action: "message",
  },
];

export const goals = [
  { id: 1, step: 1, name: "Reading Comprehension", status: "Incomplete" },
  { id: 2, step: 2, name: "Mathematical Problem Solving", status: "Completed" },
  { id: 3, step: 3, name: "Writing Expression", status: "Completed" },
];

export const parents = [
  { name: "Jenna Brown", avatar: Avatar, status: "active", action: "remove" },
  {
    name: "Melony Cartwright",
    avatar: Avatar,
    status: "active",
    action: "message",
  },
  {
    name: "Melony Cartwright",
    avatar: Avatar,
    status: "active",
    action: "message",
  },
  {
    name: "Melony Cartwright",
    avatar: Avatar,
    status: "active",
    action: "message",
  },
];

export const rewards = [
  { image: Shoes, name: "Air Jordans", coins: 25 },
  { image: Clothes, name: "Supreme Hoodie", coins: 120 },
  { image: Cap, name: "Supreme LV Cap", coins: 200 },
  { image: TV, name: "Samsung TV", coins: 35 },
];

export const records = [
  {
    id: 1,
    date: "2023-04-01",
    score: 51,
    notes:
      "Administration and or teacher identifies students who need more intervention support than what the School wide Positive Behavior",
  },
  {
    id: 2,
    date: "2023-05-01",
    score: 49,
    notes:
      "Administration and or teacher identifies students who need more intervention support than what the School wide Positive Behavior",
  },
  {
    id: 3,
    date: "2023-05-28",
    score: 49,
    notes:
      "Administration and or teacher identifies students who need more intervention support than what the School wide Positive Behavior",
  },
  {
    id: 4,
    date: "2023-06-02",
    score: 49,
    notes:
      "Administration and or teacher identifies students who need more intervention support than what the School wide Positive Behavior",
  },
];
