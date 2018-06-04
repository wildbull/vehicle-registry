pragma solidity ^0.4.15;
contract VehicleRegistry
{
    address public admin;
    uint256 commission;
    mapping(uint256=>Vehicle) public vehicles;
    uint256 public NumberOfVehicles;
    
    struct Vehicle
    {
        uint256 id;
        address owner;
        string make;
        string model;
        string year;
        string color;
        string licensePlate;
        string VIN;
    }
    
    event VehicleRegistered(uint256 id,address owner);
    event VehicleTransferred(uint256 id,address OldOwner, address NewOwner);
    
    function Balance()
        public
        constant
        returns(uint256 balance)
    {
        if(msg.sender!=admin) throw;
        return this.balance;
    }
    
    function VehicleRegistry()
    {
        admin=msg.sender;
        NumberOfVehicles=0;
        commission = 1000000000000000000;
    }
    
    function RegisterVehicle(
        string make,
        string model,
        string year,
        string color,
        string licensePlate,
        string VIN)
        public
        payable
    {
        if(msg.value<commission) throw;
        Vehicle memory vehicle;
        vehicle.id = NumberOfVehicles;
        vehicle.owner = msg.sender;
        vehicle.make = make;
        vehicle.model=model;
        vehicle.year=year;
        vehicle.color=color;
        vehicle.licensePlate = licensePlate;
        vehicle.VIN=VIN;
        
        vehicles[NumberOfVehicles]=vehicle;
        VehicleRegistered(NumberOfVehicles,vehicle.owner);
        NumberOfVehicles+=1;
    }
   
   function TransferOwnership(uint256 id, address newOwner)
    public
    payable
   {
       if(msg.value<commission) throw;
       if(vehicles[id].owner!=msg.sender) throw;
       address oldOwner = vehicles[id].owner;
       vehicles[id].owner = newOwner;
       VehicleTransferred(id,oldOwner,newOwner);
       
   }
   
   function ChangeAdmin(address newAdmin)
    public
   {
       if(msg.sender!=admin) throw;
       admin = newAdmin;
   }
   
   function SetCommission(uint256 newCommission)
   {
       if(msg.sender!=admin) throw;
       commission = newCommission;
   }
   
    function Withdraw(uint256 balance)
        public
        returns(bool success)
    {
         if(msg.sender!=admin) throw;
         if(balance>this.balance) throw;
         if(!admin.send(balance)) throw;
         return true;
    }
    
    function()
    {
        throw;
    }
    
    function kill()
        public
    {
        if(msg.sender!=admin) throw;
        selfdestruct(admin);
    }


   
}