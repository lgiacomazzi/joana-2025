"use server";

import {
  setArtVisibilityById,
  setArtInCarouselById,
  fetchPaginatedArts,
} from "@/lib/data";

export async function GetPaginatedArts(page: number, pageSize?: number) {
  try {
    console.log("# Server action GetPaginatedArts");
    const data = await fetchPaginatedArts(page, pageSize);
    return data;
  } catch (error) {
    console.error("Erro buscando artes.", error);
    return { success: false, error: "Erro buscando artes" };
  }
}

export async function SetArtVisibility(id: string, visible: boolean) {
  try {
    visible === false
      ? console.log("Ocultando arte " + id)
      : console.log("Mostrando arte " + id);
    await setArtVisibilityById(id, visible);
    return { success: true };
  } catch (error) {
    console.error("Erro ao alterar a visibilitade da arte:" + id, error);
    return { success: false, error: "Erro ao alterar a visibilidade da arte." };
  }
}

export async function SetArtInCarousel(id: string, visible: boolean) {
  try {
    visible === false
      ? console.log("Removendo arte " + id + " no carousel")
      : console.log("Adicionando arte " + id + " no carousel");
    await setArtInCarouselById(id, visible);
    return { success: true };
  } catch (error) {
    console.error("Erro ao configurar arte:" + id, error);
    return { success: false, error: "Erro ao configurar arte." };
  }
}

export async function DeleteArt(id: string) {
  try {
    // await deleteArtById(id);
    console.log("Deletando arte " + id);
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar arte:", error);
    return { success: false, error: "Erro ao deletar arte." };
  }
}
