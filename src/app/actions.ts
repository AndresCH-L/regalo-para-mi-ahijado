"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createChild(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const birthDate = formData.get("birthDate") as string;
  const biography = formData.get("biography") as string;

  await prisma.child.create({
    data: {
      firstName,
      lastName: lastName || null,
      birthDate: birthDate ? new Date(birthDate) : null,
      biography: biography || null,
    },
  });

  revalidatePath("/dashboard");
}

export async function createMemory(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const memoryDate = formData.get("memoryDate") as string;
  const category = formData.get("category") as string;
  const childId = formData.get("childId") as string;

  await prisma.memory.create({
    data: {
      title,
      description,
      memoryDate: new Date(memoryDate),
      category: category as any,
      childId,
    },
  });

  revalidatePath("/");
}

export async function createLetter(
  formData: FormData
) {
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const content = formData.get("content") as string;
  const unlockDate = formData.get("unlockDate") as string;

  const child = await prisma.child.findUnique({
    where: {
      slug,
    },
  });

  if (!child) return;

  await prisma.letter.create({
    data: {
      title,
      author,
      content,
      unlockDate: new Date(unlockDate),
      childId: child.id,
    },
  });

  revalidatePath(`/story/${slug}/letters`);
}

export async function updateChild(
  formData: FormData
) {
  const id = formData.get("id") as string;

  const firstName =
    formData.get("firstName") as string;

  const lastName =
    formData.get("lastName") as string;

  const birthDate =
    formData.get("birthDate") as string;

  const biography =
    formData.get("biography") as string;

  await prisma.child.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName: lastName || null,
      birthDate: birthDate
        ? new Date(birthDate)
        : null,
      biography: biography || null,
    },
  });

  revalidatePath("/dashboard");
}

export async function updateMemory(
  formData: FormData
) {
  const id = formData.get("id") as string;

  const title =
    formData.get("title") as string;

  const description =
    formData.get("description") as string;

  const memoryDate =
    formData.get("memoryDate") as string;

  const category =
    formData.get("category") as string;

  await prisma.memory.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      memoryDate: new Date(memoryDate),
      category: category as any,
    },
  });

  revalidatePath("/");
}

export async function createUser(
  formData: FormData
) {
  const name =
    formData.get("name") as string;

  const email =
    formData.get("email") as string;

  const role =
    formData.get("role") as string;

  await prisma.user.create({
    data: {
      name,
      email,
      role: role as any,
    },
  });

  revalidatePath("/users");
}