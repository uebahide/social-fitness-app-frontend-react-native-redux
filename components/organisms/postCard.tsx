import { post } from "@/types/post";
import { Link, useRouter } from "expo-router";
import { FC, memo } from "react";
import { Text, Pressable } from "react-native";

type PostCardProps = {
  post: post;
};

export const PostCard: FC<PostCardProps> = memo(({ post }) => {
  const created_at = new Date(post.created_at);
  const formattedDate = created_at.toLocaleString("en-US", {
    weekday: "long", // Full weekday name (e.g., "Monday")
    year: "numeric", // Full year (e.g., "2025")
    month: "long", // Full month name (e.g., "March")
    day: "numeric", // Day of the month (e.g., "28")
    hour: "2-digit", // Hour (2 digits, e.g., "02")
    minute: "2-digit", // Minute (2 digits, e.g., "30")
    second: "2-digit", // Second (2 digits, e.g., "15")
  });

  return (
    <Link
      href={{
        pathname: "/main/home/showPost",
        params: { post_id: post.id },
      }}
      asChild
    >
      <Pressable className="rounded-lg items-center mb-2 py-10 bg-green-100">
        <Text>Post date: {formattedDate}</Text>
        <Text>Title: {post.title}</Text>
        <Text>Count/distance: {post.count}</Text>
        <Text>Hour: {post.time_hour}</Text>
        <Text>Min: {post.time_minute}</Text>
      </Pressable>
    </Link>
  );
});
