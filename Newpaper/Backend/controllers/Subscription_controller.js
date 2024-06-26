const Subscription = require('../models/Subscription_model');

const subscriptionController = {
  create: async (req, res) => {
    try {
      const newSubscription = new Subscription({
        ...req.body,
        user: req.user._id,
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) // 1 year subscription
      });
      await newSubscription.save();
      res.status(201).json(newSubscription);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  getByUser: async (req, res) => {
    try {
      const subscription = await Subscription.findOne({ user: req.user._id });
      res.json(subscription);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  cancel: async (req, res) => {
    try {
      await Subscription.findOneAndDelete({ user: req.user._id });
      res.json({ message: 'Subscription cancelled' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = subscriptionController;
