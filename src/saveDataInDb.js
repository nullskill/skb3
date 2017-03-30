import PC from './models/PC';
// import HDD from './models/HDD';

export default async function saveDataInDb(data) {
  try {
    const pc = new PC(data);
    // const hdd = new HDD(data);
    
    // сначала очистим базу
    // await HDD.remove({});
    await PC.remove({});

    await pc.save();
    // const promises = data.hdd.map((disk) => {
    //   const diskData = Object.assign({}, disk, {
    //     owner: pc._id,
    //   });
    //   return (new HDD(diskData)).save();
    // });
    console.log('success');
    return pc;
    // .find().populate('hdd').exec(function(err, pc) {
    //   if (err) return next(err);
    // });
  } catch(e) {
    console.log(e);
    throw e;
  }
}