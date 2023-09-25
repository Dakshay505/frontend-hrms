import check from "../../assets/Check.png"
import WarningCircle from "../../assets/WarningCircle.svg";
export const BankDetails = () => {

 
  return (
    <form className="flex flex-col  gap-[24px]">
      <div className="flex justify-between items-center">
        <h1 className="text-[18px] font-bold text-[#2E2E2E]">Bank Details</h1>
        <button type="submit" className="flex gap-[5px] bg-[#414EF1] rounded-[8px] px-[16px] py-[12px] justify-center items-center text-white" >
          <img src={check} alt="" className="w-[16px] h-[16px]" />
          Save
        </button>

      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="flex gap-[10px] items-center bg-[#FCECEC] rounded-lg p-4">
          <div>
            <img src={WarningCircle} className="w-[20px] h-[20px]" alt="" />
          </div>
          <div>
            <p className="text-sm leading-4 font-medium text-[#8A2626]">
              Contact number is not verified!{" "}
              <span

                className="underline underline-offset-2 cursor-pointer"
              >
                Verify Now
              </span>
            </p>
          </div>
        </div>

        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
          <span className="text-[12px]">Pan Number</span>
          <input type="text" placeholder="ABD54545N" name="" id="" className="outline-none text-[16px]" />
        </div>


        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
          <span className="text-[12px]">ESI ID</span>
          <input type="text" placeholder="Type your ID" name="" id="" className="outline-none text-[16px]" />
        </div>


        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
          <span className="text-[12px]">Bank Name</span>
          <input type="text" placeholder="Type bank name" name="" id="" className="outline-none text-[16px]" />
        </div>



        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
          <span className="text-[12px]">Account Number</span>
          <input type="Number" placeholder="Type bank number" name="" id="" className="outline-none text-[16px]" />
        </div>



        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
          <span className="text-[12px]">IFSC Code</span>
          <input type="text" placeholder="Type code" name="" id="" className="outline-none text-[16px]" />
        </div>



        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
          <span className="text-[12px]">Branch Code</span>
          <input type="text" placeholder="Type your branch code" name="" id="" className="outline-none text-[16px]" />
        </div>




      </div>

    </form>
  )
}
