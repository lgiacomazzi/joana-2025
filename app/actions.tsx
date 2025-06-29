"use server";

import {
  setArtVisibilityById,
  setArtInCarouselById,
  fetchPaginatedArts,
  fetchBugs,
  setArtAvailabilitylById,
  createArt as createArtInDatabase,
  deleteArtById,
  fetchArtsBySearch,
} from "@/lib/data";
import { Art } from "@/lib/definitions";

export async function GetArts(category?: string) {
  try {
    const data = await fetchBugs(undefined, category, undefined);
    return data;
  } catch (error) {
    console.error("Erro buscando artes.", error);
    return { success: false, error: "Erro buscando artes" };
  }
}

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

export async function SearchArts(searchTerm: string) {
  try {
    const data = await fetchArtsBySearch(searchTerm);
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

export async function SetArtForSale(id: string, sellable: boolean) {
  try {
    sellable === false
      ? console.log("Removendo arte " + id + " das disponíveis")
      : console.log("Adicionando arte " + id + " nas disponíveis");
    await setArtAvailabilitylById(id, sellable);
    return { success: true };
  } catch (error) {
    console.error("Erro ao configurar arte:" + id, error);
    return { success: false, error: "Erro ao configurar arte." };
  }
}

export async function DeleteArt(id: string) {
  try {
    await deleteArtById(id);
    console.log("Deletando arte " + id);
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar arte:", error);
    return { success: false, error: "Erro ao deletar arte." };
  }
}

export async function CreateArt(art: Partial<Art>) {
  try {
    console.log("Creating new art:", art);

    // Call the createArt function from the data.ts file
    const response = await createArtInDatabase(art);

    if (response.success) {
      console.log("Art created successfully!");
      return { success: true };
    } else {
      console.error("Failed to create art:", response.error);
      return { success: false, error: response.error };
    }
  } catch (error) {
    console.error("Error while creating art:", error);
    return { success: false, error: "Error while creating art." };
  }
}
