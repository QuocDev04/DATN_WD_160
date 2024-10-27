/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from "../images/logo.png";
import search from "../images/search.png";
import home from "../images/home.png";
import chevronsRight from "../images/chevrons-right.png";
import star from "../images/star.png";
import produc1 from "../images/anh.jpg";

function App() {
  return (
    <div className="App">
      <header className="bg-[#F6F0E2] px-[76px] flex flex-col gap-[56px]">
        <div className="flex justify-between gap-[22px] items-center">
          <div className="flex items-center gap-[22px]">
            <a href="">
              <img src={logo} alt="" className="w-[80px] h-[80px]" />
            </a>
            <p className="w-[288px]">HOTLINE : 0123456789</p>
          </div>
          <div className="flex-1 flex items-center justify-between gap-[48px] ">
            <div className="flex bg-[#D9D9D9] flex-1 rounded-[20px] px-[10px]">
              <input
                type="text"
                name=""
                id=""
                className="bg-[#D9D9D9] flex-1 rounded-[20px] outline-none px-[20px] h-[44px]"
              />
              <button>
                <img src={search} alt="" className="w-[24px] h-[24px]" />
              </button>
            </div>
            <a href="">
              <img src={home} alt="" className="w-[34px] h-[34px]" />
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <ul className="flex gap-[36px] items-center">
            <li>
              <a href="" className="text-[#8B4D02] px-[8px] py-[6px] block">
                HOME
              </a>
            </li>
            <li>
              <a href="" className="text-[#8B4D02] px-[8px] py-[6px] block">
                GIỚI THIỆU SẢN PHẨM
              </a>
            </li>
            <li>
              <a href="" className="text-[#8B4D02] px-[8px] py-[6px] block">
                TẠP CHÍ THÚ CƯNG
              </a>
            </li>
            <li>
              <a href="" className="text-[#8B4D02] px-[8px] py-[6px] block">
                ĐẶT PHÒNG
              </a>
            </li>
            <li>
              <a href="" className="text-[#8B4D02] px-[8px] py-[6px] block">
                LIÊN HỆ
              </a>
            </li>
            <li>
              <a href="" className="text-[#8B4D02] px-[8px] py-[6px] block">
                GIỚI THIỆU VỀ SHOP
              </a>
            </li>
          </ul>
        </div>
      </header>
      {/* end header */}
      {/* main */}
      <main className="pt-[108px]">
        {/* product info */}
        <div className="px-[78px]">
          <div className="grid grid-cols-12 ">
            <div className="col-span-6">
              <div className="pl-[108px] flex flex-col gap-[36px]">
                <div className="">
                  <img
                    className="w-full"
                    src={produc1}
                    alt=""
                  />
                </div>
                <div className="flex items-center gap-[30px] justify-center">
                  <img
                    className="max-w-[80px]"
                    src={produc1}
                    alt=""
                  />
                  <img
                    className="max-w-[80px]"
                    src={produc1}
                    alt=""
                  />
                  <img
                    className="max-w-[80px]"
                    src={produc1}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <div className="pl-[178px] text-left ">
                <h2 className="text-[24px] font-medium	">Tên phòng</h2>
                <p className="py-[26px] text-[14px] font-medium">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                  doloremque itaque dolore nihil consectetur necessitatibus
                  maxime fuga molestias doloribus laboriosam culpa dolor tempore
                  officia repellendus accusantium eius, quisquam expedita illo.
                </p>
                <div className="">
                  <h5 className="font-medium">Ưu đãi khi đặt phòng</h5>
                  <ul>
                    <li className="font-medium"> - Lorem ipsum dolor</li>
                    <li className="font-medium"> - Lorem ipsum dolor</li>
                    <li className="font-medium">- Lorem ipsum dolor</li>
                  </ul>
                </div>
                <div className="py-[26px] flex gap-[98px]">
                  <div className="flex flex-col gap-[34px]">
                    <h5 className="font-bold">Đặt theo giờ</h5>
                    <p className="px-[12px] py-[4px] bg-[#D9D9D9] rounded-[20px]">
                      Giá: 1000đ ( 1h)
                    </p>
                  </div>
                  <div className="flex flex-col gap-[34px]">
                    <h5 className="font-bold">Đặt theo ngày</h5>
                    <p className="px-[12px] py-[4px] bg-[#D9D9D9] rounded-[20px]">
                      Giá: 1000đ ( 1h)
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="px-[18px] py-[6px] bg-[#E1F8C1] rounded-[10px]  flex gap-1 items-center">
                    Đặt phòng
                    <img
                      src={chevronsRight}
                      alt=""
                      className="w-[18px] h-[18px]"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* detail product */}
        <div className="px-[74px] pt-[78px] ">
          <div className="shadow-md px-[74px] py-[36px]">
            <h2 className="text-[40px] font-bold text-center mb-[62px]">
              Chi tiết về phòng
            </h2>
            <p>
              1. Không gian và kích thước Diện tích: Phòng thường có diện tích
              nhỏ, từ 1-2 mét vuông, đủ để thú cưng có không gian di chuyển
              thoải mái nhưng không quá rộng. Kích thước có thể khác nhau tùy
              thuộc vào kích thước của thú cưng, với các tùy chọn cho chó và
              mèo. Kiểu chuồng: Thường là dạng chuồng có rào chắn hoặc khu vực
              phòng riêng, dễ vệ sinh và thoáng khí. 2. Tiện nghi cơ bản Giường
              ngủ: Phòng có giường nệm hoặc tấm lót mềm mại để thú cưng nằm ngủ
              thoải mái, nhưng không quá cầu kỳ. Bát nước và thức ăn: Cung cấp
              bát nước và bát thức ăn làm bằng nhựa hoặc thép không gỉ. Chế độ
              ăn uống cơ bản thường bao gồm thức ăn khô hoặc ẩm tùy theo nhu cầu
              của từng thú cưng. Đồ chơi đơn giản: Để giúp vật nuôi giải trí
              trong lúc lưu trú, một số đồ chơi nhỏ có thể được cung cấp, nhưng
              không quá nhiều hay phức tạp.
            </p>
          </div>
        </div>

        {/* review */}
        <div className="px-[74px] pt-[36px]">
          <div className="shadow-md px-[74px] py-[36px]">
            <h2 className="text-center font-bold text-[40px] mb-[30px]">
              Đánh giá
            </h2>
            <div className="grid grid-cols-12 gap-[24px]">
              <div className="col-span-8">
                <div className="flex flex-col gap-[24px]">
                  <div className="flex items-center gap-[24px]">
                    <div className="flex gap-8 items-center">
                      <div className="">
                        <a href="">
                          <img
                            src="https://i.pinimg.com/564x/b5/09/68/b50968c96cc64fb4db0fd0dc2ef8464e.jpg"
                            alt=""
                            className="w-[60px] h-[60px] rounded-full"
                          />
                        </a>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[20xp]">Nguyễn văn a</h3>
                        <div className="flex gap-4">
                          <img
                            src={star}
                            alt=""
                            className="w-[18px] h-[18px]"
                          />
                          <img
                            src={star}
                            alt=""
                            className="w-[18px] h-[18px]"
                          />
                          <img
                            src={star}
                            alt=""
                            className="w-[18px] h-[18px]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="border-l-[1px] border-black pl-[24px]">
                      <p>binh luan so 1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-[24px]">
                    <div className="flex gap-8 items-center">
                      <div className="">
                        <a href="">
                          <img
                            src="https://i.pinimg.com/564x/b5/09/68/b50968c96cc64fb4db0fd0dc2ef8464e.jpg"
                            alt=""
                            className="w-[60px] h-[60px] rounded-full"
                          />
                        </a>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[20xp]">Nguyễn văn a</h3>
                        <div className="flex gap-4">
                          <img
                            src={star}
                            alt=""
                            className="w-[18px] h-[18px]"
                          />
                          <img
                            src={star}
                            alt=""
                            className="w-[18px] h-[18px]"
                          />
                          <img
                            src={star}
                            alt=""
                            className="w-[18px] h-[18px]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="border-l-[1px] border-black pl-[24px]">
                      <p>binh luan so 1</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="shadow-md border border-gray-200 p-[12px] rounded-md flex  flex-col gap-[12px]">
                  <h5 className="text-center text-[20px]">Bình luận ngay</h5>

                  <textarea
                    name=""
                    id=""
                    className="border-[#0000004d] border rounded-[10px] outline-none px-[14px] py-[6px]"
                  ></textarea>

                  <div className="flex justify-center">
                    <button className="bg-[#C8F3A1] rounded-lg px-[72px] py-[6px]">
                      Gửi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* collection */}
        <div className="pt-[126px] px-[74px] ">
          <h2 className="text-[32px] font-bold text-center mb-[108px]">
            Phòng đặt liên quan
          </h2>

          <div className="grid grid-cols-12 gap-[82px]">
            <div className="col-span-3">
              <div className="p-[4px] bg-[#D3D3D3] flex flex-col gap-2 h-full">
                <a href="" className="flex-1">
                  <img
                    src={produc1}
                    alt=""
                    className="w-full rounded-md h-full"
                  />
                </a>
                <div className="flex flex-col gap-1 px-[2px]">
                  <h5 className="font-medium text-[14px]">ten phong</h5>
                  <div className="flex gap-2">
                    <img src={star} alt="" className="w-[16px] h-[16px]" />
                    <img src={star} alt="" className="w-[16px] h-[16px]" />
                    <img src={star} alt="" className="w-[16px] h-[16px]" />
                  </div>
                  <p className="text-[#FF0000]">20$</p>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="p-[4px] bg-[#D3D3D3] flex flex-col gap-2 h-full">
                <a href="" className="flex-1">
                  <img
                    src={produc1}
                    alt=""
                    className="w-full rounded-md h-full"
                  />
                </a>
                <div className="flex flex-col gap-1 px-[2px]">
                  <h5 className="font-medium text-[14px]">ten phong</h5>
                  <div className="flex gap-2">
                    <img src={star} alt="" className="w-[16px] h-[16px]" />
                    <img src={star} alt="" className="w-[16px] h-[16px]" />
                    <img src={star} alt="" className="w-[16px] h-[16px]" />
                  </div>
                  <p className="text-[#FF0000]">20$</p>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="p-[4px] bg-[#D3D3D3] flex flex-col gap-2 h-full">
                <a href="" className="flex-1">
                  <img
                    src={produc1}
                    alt=""
                    className="w-full rounded-md h-full"
                  />
                </a>
                <div className="flex flex-col gap-1 px-[2px]">
                  <h5 className="font-medium text-[14px]">ten phong</h5>
                  <div className="flex gap-2">
                    <img src={star} alt="" className="w-[16px] h-[16px]" />
                    <img src={star} alt="" className="w-[16px] h-[16px]" />
                    <img src={star} alt="" className="w-[16px] h-[16px]" />
                  </div>
                  <p className="text-[#FF0000]">20$</p>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="p-[4px] bg-[#D3D3D3] flex flex-col gap-2 h-full">
                <a href="" className="flex-1">
                  <img
                    src={produc1}
                    alt=""
                    className="w-full rounded-md h-full"
                  />
                </a>
                <div className="flex flex-col gap-1 px-[2px]">
                  <h5 className="font-medium text-[14px]">ten phong</h5>
                  <div className="flex gap-2">
                    <img src={star} alt="" className="w-[16px] h-[16px]" />
                    <img src={star} alt="" className="w-[16px] h-[16px]" />
                    <img src={star} alt="" className="w-[16px] h-[16px]" />
                  </div>
                  <p className="text-[#FF0000]">20$</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[38px]">
            <a href="" className="flex justify-center items-center gap-1">
              Xem thêm
              <img src={chevronsRight} alt="" className="w-[16px] h-[16px]" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
