
const express = require('express');
const pool = require('../db'); 
const router = express.Router();

// GET
router.get('/tickets', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tickets');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST
router.post('/tickets', async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      const newTicket = await pool.query(
        'INSERT INTO tickets (name, email, message) VALUES ($1, $2, $3) RETURNING *',
        [name, email, message]
      );
      res.json(newTicket.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
// PATCH
router.patch('/tickets/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedTicket = await pool.query(
      'UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *',
      [status, id],
      console.log('updated ticket to compleated')
    );

    if (updatedTicket.rowCount === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json(updatedTicket.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// DELETE
router.delete('/tickets/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleteTicket = await pool.query(
        'DELETE FROM tickets WHERE id = $1 RETURNING *',
        [id]
      );
  
      if (deleteTicket.rowCount === 0) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      res.json({ message: 'Ticket deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });  

module.exports = router;
