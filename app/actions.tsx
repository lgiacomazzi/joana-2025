"use server";

import { setArtVisibilityById, setArtInCarouselById } from "@/lib/data";

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
