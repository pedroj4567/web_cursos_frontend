import strapiApi from "../lib/axios";

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

interface FilterParams {
  search?: string;
  category?: string | number;
  sort?: string;
  featured?: boolean;
}

export const courseServices = {
  async getCoursesByPage({ page = 1, pageSize = 10 }: PaginationParams = {}) {
    try {
      // Filtros

      const { data } = await strapiApi.get(
        `/courses?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
      );
      return {
        data: data.data,
        meta: data.meta,
      };
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  async getCourseById(id: string | number) {
    try {
      const { data } = await strapiApi.get(
        `/courses?populate=*&filters[documentId][$eq]=${id}`
      );

      if (!data.data || data.data.length === 0) {
        throw new Error(`No se encontró el curso con documentId ${id}`);
      }
      return {
        data: data.data[0],
        meta: data.meta,
      };
      return data[0];
    } catch (error) {
      console.error(`Error fetching course with documentId ${id}:`, error);
      throw error;
    }
  },

  async getFeaturedCourses(limit: number = 4) {
    try {
      const url = `/courses?filters[featured][$eq]=true&populate=image&pagination[pageSize]=${limit}&sort=createdAt:desc`;
      const { data } = await strapiApi.get(url);
      return data.data;
    } catch (error) {
      console.error("Error fetching featured courses:", error);
      throw error;
    }
  },

  async getRelatedCourses(
    courseId: string | number,
    categoryId: string | number,
    limit: number = 3
  ) {
    try {
      const { data } = await strapiApi.get("/courses", {
        params: {
          "filters[id][$ne]": courseId,
          "filters[categories][id][$eq]": categoryId,
          "populate[0]": "image",
          "pagination[pageSize]": limit,
          sort: "rating:desc",
        },
      });
      return data.data;
    } catch (error) {
      console.error("Error fetching related courses:", error);
      throw error;
    }
  },

  async addFavoriteCourse(userId: number | string, courseId: number | string) {
    try {
      const { data: userData } = await strapiApi.get(
        `/users/${userId}?populate=favoritesCourse`
      );
      const currentFavorites =
        userData.favoritesCourse?.map((c: any) => c.id) || [];

      if (currentFavorites.includes(Number(courseId))) {
        // Ya está en favoritos, no hacer nada o lanzar mensaje
        return userData;
      }

      const updatedFavorites = [...currentFavorites, Number(courseId)];

      const { data: updatedUser } = await strapiApi.put(`/users/${userId}`, {
        favoritesCourse: updatedFavorites,
      });
      return updatedUser;
    } catch (error) {
      console.error("Error agregando curso favorito:", error);
      throw error;
    }
  },

  async removeFavoriteCourse(
    userId: number | string,
    courseId: number | string
  ) {
    try {
      const { data: userData } = await strapiApi.get(
        `/users/${userId}?populate=favoritesCourse`
      );
      const currentFavorites =
        userData.favoritesCourse?.map((c: any) => c.id) || [];

      const updatedFavorites = currentFavorites.filter(
        (id: number) => id !== Number(courseId)
      );

      const { data: updatedUser } = await strapiApi.put(`/users/${userId}`, {
        favoritesCourse: updatedFavorites,
      });

      return updatedUser;
    } catch (error) {
      console.error("Error quitando curso favorito:", error);
      throw error;
    }
  },

  // Añade esta nueva función a tu courseServices

  async getFilteredCourses(filters: {
    search?: string;
    category?: string;
    level?: string[];
    page?: number;
    pageSize?: number;
  }) {
    try {
      // Inicializamos params con los valores básicos
      const params: any = {
        populate: "*",
        "pagination[page]": filters.page || 1,
        "pagination[pageSize]": filters.pageSize || 10,
        filters: {}, // Asegúrate de inicializar el objeto filters
      };

      // Filtro de búsqueda
      if (filters.search) {
        params.filters["$or"] = [
          { Title: { $containsi: filters.search } },
          { Description: { $containsi: filters.search } },
          { ShortDescription: { $containsi: filters.search } },
        ];
      }

      // Filtro de categoría
      if (filters.category) {
        params.filters.categories = {
          name: { $eq: filters.category },
        };
      }

      // Filtro de nivel
      if (filters.level && filters.level.length > 0) {
        params.filters.Level = { $in: filters.level };
      }

      const { data } = await strapiApi.get("/courses", { params });
      return {
        data: data.data,
        meta: data.meta,
      };
    } catch (error) {
      console.error("Error fetching filtered courses:", error);
      throw error;
    }
  },
};
