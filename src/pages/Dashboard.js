import React from 'react';
import { Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="p-6">
        <Typography variant="h4" gutterBottom className="text-gray-900 dark:text-white">
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <Typography variant="h6" className="text-gray-900 dark:text-white mb-2">
                Welcome to Gametest.in
              </Typography>
              <Typography variant="body1" className="text-gray-600 dark:text-gray-300">
                This is your dashboard. You can view your progress and upcoming activities here.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <Typography variant="h6" className="text-gray-900 dark:text-white mb-2">
                Quick Stats
              </Typography>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Progress</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total game's played</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Average Score</span>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">78%</span>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <Typography variant="h6" className="text-gray-900 dark:text-white mb-2">
                Recent Activity
              </Typography>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Not yet started playing game</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Attende and play the free game</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">clicked the sidebar for Game024 menu</span>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </motion.div>
  );
};

export default Dashboard; 

