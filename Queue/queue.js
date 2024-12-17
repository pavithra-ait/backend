const queue = [];

let isProcessing = false;


const addToQueue = (task) => {
  queue.push(task);
  console.log(`Task added to queue. Queue size: ${queue.length}`);
};


const processQueue = async () => {
  if (isProcessing || queue.length === 0) return;

  isProcessing = true;
  const task = queue.shift();  
  try {
    console.log(`Processing task: ${task.type}`);

    await task.execute();
    console.log(`Task completed: ${task.type}`);
  } catch (err) {
    console.error(`Error processing task: ${task.type}`, err);
  } finally {
    isProcessing = false;
    setTimeout(processQueue, 1000); 
  }
};

setInterval(processQueue, 1000);

module.exports = { addToQueue };
