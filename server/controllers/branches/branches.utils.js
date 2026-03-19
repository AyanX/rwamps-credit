const formattedResToClient = (branch) => {
  const unDeletedBranches = branch.filter((branch) => !branch.isDeleted);
  if (unDeletedBranches.length === 0) {
    return [];
  }
  const branchData = unDeletedBranches.map((data) => {
    return {
      id: data.id,
      branch_name: data.branch_name,
      location: data.location,
      phone_number: data.phone_number,
      email: data.email,
      website: data.website,
      open_time: data.open_time,
      close_time: data.close_time
    };
  });
  return branchData;
};


const validBranchDataToDbFormat = (data) => {
    if(!data.branch_name || !data.location || !data.phone_number || !data.email || !data.website || !data.open_time || !data.close_time){
        throw new Error("All fields are required.");
    }


  return {
    branch_name: data.branch_name,
    location: data.location,
    phone_number: data.phone_number,
    email: data.email,
    website: data.website,
    open_time: data.open_time,
    close_time: data.close_time,
  };
}


module.exports ={
    validBranchDataToDbFormat,
    formattedResToClient
}