import strapiApi from "../lib/axios";
import { User } from "./types";

export const reportServices = {
  async getCoursesWithUsers(): Promise<{ course: Course; users: User[] }[]> {
    try {
      const { data } = await strapiApi.get("/courses", {
        params: {
          populate: {
            users: {
              populate: "*",
            },
          },
        },
      });

      return data.data.map((course: any) => ({
        course: {
          id: course.id,
          documentId: course.attributes.documentId,
          Title: course.attributes.Title,
          Description: course.attributes.Description,
          Level: course.attributes.Level,
          Banner: course.attributes.Banner?.data?.attributes?.url || "",
        },
        users:
          course.attributes.users?.data?.map((user: any) => ({
            id: user.id,
            username: user.attributes.username,
            email: user.attributes.email,
            createdAt: user.attributes.createdAt,
          })) || [],
      }));
    } catch (error) {
      console.error("Error fetching courses with users:", error);
      throw error;
    }
  },
};
