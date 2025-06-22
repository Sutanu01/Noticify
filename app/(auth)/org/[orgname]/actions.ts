"use server";

import { createNoticeType, noticeTable } from "@/db/schema";
import { db } from "@/db";
export const createNotice = async (payload: createNoticeType) => {
  const [res] = await db.insert(noticeTable).values(payload).returning({
    id: noticeTable.id,
  });
  return res.id;
};
