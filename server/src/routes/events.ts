import { Router } from 'express';
import { db } from '../db/schema';
import { events } from '../db/schema/events';

const router = Router();

router.post('/', async (req, res) => {
  const { userId, type, payload } = req.body;
  if (!userId || !type) {
    res.status(400).json({ error: 'userId and type are required' });
    return;
  }
  try {
    await db.insert(events).values({
      id: crypto.randomUUID(),
      userId,
      type,
      payload: JSON.stringify(payload || {}),
    });

    console.log('Event inserted:', {
      userId,
      type,
      payload: JSON.stringify(payload || {}),
    });

    res.status(201).json({ status: 'ok' });
  } catch (error) {
    console.error('Error inserting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
