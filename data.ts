import { Chapter } from './types';

export const textbookData: Chapter[] = [
  {
    id: 'c1',
    title: 'Chương I: Năng Lượng Cơ Học',
    lessons: [
      {
        id: 'l1',
        title: 'Bài 1: Công và Công suất',
        summary: `
          <p class="mb-3">Trong đời sống, ta thường nói "làm việc" hay "tốn công sức". Tuy nhiên, trong Vật lí, khái niệm <strong>công cơ học</strong> có ý nghĩa hẹp hơn và chính xác hơn.</p>
          
          <div class="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-800 text-sm">
            <i class="fas fa-info-circle mr-2"></i>
            Chỉ có công cơ học khi có <strong>lực tác dụng</strong> vào vật và làm vật <strong>chuyển dời</strong> theo phương của lực.
          </div>

          <h4 class="font-bold text-gray-800 mt-4 mb-2"><i class="fas fa-angle-right text-teal-600 mr-2"></i>1. Công cơ học</h4>
          <ul class="list-disc pl-5 mb-4 space-y-1 text-gray-700">
            <li>Ký hiệu: $A$</li>
            <li>Đơn vị: Jun (J)</li>
            <li>Công thức: $A = F \\cdot s$ (khi lực cùng hướng chuyển động)</li>
          </ul>
          
          <h4 class="font-bold text-gray-800 mt-4 mb-2"><i class="fas fa-angle-right text-teal-600 mr-2"></i>2. Công suất</h4>
          <p class="mb-2 text-gray-700">Để so sánh tốc độ thực hiện công của các máy móc hay con người, người ta dùng khái niệm công suất.</p>
          <ul class="list-disc pl-5 mb-4 space-y-1 text-gray-700">
            <li>Ký hiệu: $\\mathcal{P}$</li>
            <li>Đơn vị: Oát (W)</li>
            <li>Ý nghĩa: Cho biết công thực hiện được trong một đơn vị thời gian.</li>
          </ul>
        `,
        formulas: [
          { label: 'Công cơ học', latex: '$A = F \\cdot s$' },
          { label: 'Công suất', latex: '$\\mathcal{P} = \\frac{A}{t}$' }
        ],
        examples: [
          {
            id: 'ex-l1-1',
            title: 'Ví dụ 1: Tính công của cần cẩu',
            content: 'Một cần cẩu nâng một kiện hàng nặng 2 tấn lên cao 5m. Hãy tính công mà cần cẩu đã thực hiện.',
            solution: `
              <p><strong>Tóm tắt:</strong><br>
              $m = 2\\text{ tấn} = 2000\\text{ kg}$<br>
              $h = 5\\text{ m}$<br>
              $A = ?$</p>
              <p class="mt-2"><strong>Giải:</strong></p>
              <p>Trọng lượng của kiện hàng là:<br>
              $P = 10 \\cdot m = 10 \\cdot 2000 = 20000\\text{ (N)}$</p>
              <p>Để nâng kiện hàng lên, cần cẩu phải tác dụng một lực ít nhất bằng trọng lượng của vật: $F = P = 20000\\text{ N}$.</p>
              <p>Công mà cần cẩu thực hiện là:<br>
              $A = F \\cdot s = 20000 \\cdot 5 = 100000\\text{ (J)} = 100\\text{ (kJ)}$</p>
            `
          },
          {
            id: 'ex-l1-2',
            title: 'Ví dụ 2: So sánh công suất',
            content: 'Người thứ nhất thực hiện công 1000J trong 2 giây. Người thứ hai thực hiện công 1200J trong 3 giây. Ai làm việc khỏe hơn?',
            solution: `
              <p>Công suất của người thứ nhất:<br>
              $\\mathcal{P}_1 = \\frac{A_1}{t_1} = \\frac{1000}{2} = 500\\text{ (W)}$</p>
              <p>Công suất của người thứ hai:<br>
              $\\mathcal{P}_2 = \\frac{A_2}{t_2} = \\frac{1200}{3} = 400\\text{ (W)}$</p>
              <p class="mt-2 text-teal-700 font-semibold"><i class="fas fa-check-circle mr-1"></i> Kết luận: Vì $\\mathcal{P}_1 > \\mathcal{P}_2$ nên người thứ nhất làm việc khỏe hơn (nhanh hơn).</p>
            `
          }
        ],
        exercises: [
          {
            id: 'e1-1',
            question: 'Một con ngựa kéo xe với lực không đổi 200N đi được quãng đường 4.5km trong 30 phút. Tính công và công suất trung bình của con ngựa.',
            solution: 'Đổi: $s = 4.5\\text{km} = 4500\\text{m}$; $t = 30\\text{ phút} = 1800\\text{s}$.<br>Công thực hiện: $A = F \\cdot s = 200 \\cdot 4500 = 900,000\\text{ (J)}$.<br>Công suất: $\\mathcal{P} = \\frac{A}{t} = \\frac{900,000}{1800} = 500\\text{ (W)}$.'
          }
        ]
      },
      {
        id: 'l2',
        title: 'Bài 2: Động năng. Thế năng',
        summary: `
          <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-bolt text-yellow-500 mr-2"></i>1. Động năng</h4>
          <p class="mb-2">Mọi vật chuyển động đều có năng lượng. Năng lượng này gọi là động năng.</p>
          <ul class="list-disc pl-5 mb-4 space-y-1 text-gray-700">
             <li>Động năng phụ thuộc vào <strong>khối lượng</strong> và <strong>tốc độ</strong> của vật.</li>
             <li>Ứng dụng: Búa máy đóng cọc, viên đạn bắn xuyên qua bia gỗ.</li>
          </ul>

          <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-mountain text-green-600 mr-2"></i>2. Thế năng trọng trường</h4>
          <p class="mb-2">Là năng lượng vật có được do vị trí của nó so với mặt đất (hoặc một mốc khác).</p>
          <ul class="list-disc pl-5 mb-4 space-y-1 text-gray-700">
             <li>Thế năng phụ thuộc vào <strong>khối lượng</strong> và <strong>độ cao</strong>.</li>
             <li>Ứng dụng: Nước trong hồ chứa đập thủy điện.</li>
          </ul>
        `,
        formulas: [
            { label: 'Động năng', latex: '$W_d = \\frac{1}{2}mv^2$' },
            { label: 'Thế năng', latex: '$W_t = P \\cdot h = mgh$' }
        ],
        examples: [
          {
            id: 'ex-l2-1',
            title: 'Ví dụ 1: Tính động năng ô tô',
            content: 'Một ô tô có khối lượng 1.5 tấn đang chạy với vận tốc 72 km/h. Tính động năng của ô tô.',
            solution: `
              <p><strong>Đổi đơn vị:</strong><br>
              $m = 1.5\\text{ tấn} = 1500\\text{ kg}$<br>
              $v = 72\\text{ km/h} = \\frac{72}{3.6} = 20\\text{ m/s}$</p>
              <p class="mt-2"><strong>Giải:</strong><br>
              Động năng của ô tô là:<br>
              $W_đ = \\frac{1}{2} m \\cdot v^2 = \\frac{1}{2} \\cdot 1500 \\cdot 20^2$<br>
              $W_đ = 0.5 \\cdot 1500 \\cdot 400 = 300,000\\text{ (J)} = 300\\text{ (kJ)}$</p>
            `
          }
        ],
        exercises: [
          {
            id: 'e2-1',
            question: 'Một vật có trọng lượng 50N được đưa lên độ cao 10m so với mặt đất. Tính thế năng của vật tại độ cao đó.',
            solution: 'Thế năng $W_t = P \\cdot h = 50 \\cdot 10 = 500\\text{ (J)}$.'
          }
        ]
      },
      {
        id: 'l3',
        title: 'Bài 3: Cơ năng',
        summary: `
          <div class="p-4 bg-orange-50 rounded-lg border border-orange-200 mb-4">
            <h5 class="font-bold text-orange-800 mb-1">Định nghĩa</h5>
            <p>Tổng động năng và thế năng của vật được gọi là <strong>cơ năng</strong>.</p>
          </div>
          
          <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-sync-alt text-teal-600 mr-2"></i>Sự chuyển hóa</h4>
          <p class="mb-2">Trong quá trình chuyển động của vật, động năng và thế năng có thể chuyển hóa lẫn nhau.</p>
          
          <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-shield-alt text-teal-600 mr-2"></i>Định luật bảo toàn</h4>
          <p class="mb-2">Khi một vật chuyển động trong trọng trường chỉ chịu tác dụng của trọng lực thì cơ năng của vật là một đại lượng bảo toàn.</p>
        `,
        formulas: [
          { label: 'Cơ năng', latex: '$W = W_đ + W_t$' },
          { label: 'Bảo toàn', latex: '$W_1 = W_2 = \\text{const}$' }
        ],
        examples: [
          {
            id: 'ex-l3-1',
            title: 'Ví dụ 1: Rơi tự do',
            content: 'Một vật rơi từ độ cao 20m xuống đất. Bỏ qua sức cản không khí. Tính vận tốc của vật khi chạm đất.',
            solution: `
              <p>Chọn mốc thế năng tại mặt đất.</p>
              <p><strong>Trạng thái 1 (Tại độ cao 20m):</strong><br>
              $v_1 = 0 \\Rightarrow W_{đ1} = 0$<br>
              $W_{t1} = m \\cdot g \\cdot h$</p>
              
              <p><strong>Trạng thái 2 (Khi chạm đất):</strong><br>
              $h_2 = 0 \\Rightarrow W_{t2} = 0$<br>
              $W_{đ2} = \\frac{1}{2} m \\cdot v^2$</p>
              
              <p><strong>Áp dụng bảo toàn cơ năng ($W_1 = W_2$):</strong><br>
              $m \\cdot g \\cdot h = \\frac{1}{2} m \\cdot v^2$<br>
              $\\Rightarrow v^2 = 2gh = 2 \\cdot 10 \\cdot 20 = 400$<br>
              $\\Rightarrow v = \\sqrt{400} = 20\\text{ (m/s)}$</p>
            `
          }
        ],
        exercises: [
           {
            id: 'e3-1',
            question: 'Ném một vật thẳng đứng lên cao với vận tốc 10m/s. Tính độ cao cực đại mà vật đạt được (g=10m/s²).',
            solution: 'Bảo toàn cơ năng: $\\frac{1}{2}mv^2 = mgh_{max} \\Rightarrow h_{max} = \\frac{v^2}{2g} = \\frac{10^2}{2 \\cdot 10} = 5\\text{ (m)}$.'
           }
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Chương II: Ánh Sáng',
    lessons: [
      {
        id: 'l5',
        title: 'Bài 5: Khúc xạ ánh sáng',
        summary: `
          <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-water text-blue-500 mr-2"></i>Hiện tượng khúc xạ</h4>
          <p class="mb-2">Là hiện tượng tia sáng bị gãy khúc tại mặt phân cách khi truyền xiên góc từ môi trường trong suốt này sang môi trường trong suốt khác.</p>
          
          <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-ruler-combined text-blue-500 mr-2"></i>Mặt phẳng tới</h4>
          <p class="mb-2">Mặt phẳng chứa tia tới và pháp tuyến tại điểm tới.</p>
        `,
        formulas: [
            { label: 'Định luật Snell', latex: '$n_1 \\sin i = n_2 \\sin r$' },
            { label: 'Chiết suất tỉ đối', latex: '$n_{21} = \\frac{n_2}{n_1}$' }
        ],
        examples: [
          {
            id: 'ex-l5-1',
            title: 'Ví dụ 1: Tính góc khúc xạ',
            content: 'Tia sáng truyền từ không khí ($n_1 \\approx 1$) vào thủy tinh ($n_2 = 1.5$) với góc tới $i = 30^\\circ$. Tính góc khúc xạ.',
            solution: `
              <p>Áp dụng định luật khúc xạ ánh sáng:</p>
              <p>$n_1 \\sin i = n_2 \\sin r$</p>
              <p>$1 \\cdot \\sin(30^\\circ) = 1.5 \\cdot \\sin r$</p>
              <p>$0.5 = 1.5 \\cdot \\sin r$</p>
              <p>$\\sin r = \\frac{0.5}{1.5} = \\frac{1}{3} \\approx 0.333$</p>
              <p>$\\Rightarrow r \\approx 19.5^\\circ$</p>
            `
          }
        ],
        exercises: [
          {
            id: 'e5-1',
            question: 'Chiếu tia sáng từ nước (n=4/3) ra không khí với góc tới 30 độ. Tính góc khúc xạ.',
            solution: '$\\frac{4}{3} \\sin 30^\\circ = 1 \\cdot \\sin r \\Rightarrow \\sin r = \\frac{4}{3} \\cdot 0.5 = \\frac{2}{3} \\Rightarrow r \\approx 41.8^\\circ$.'
          }
        ]
      },
      {
        id: 'l8',
        title: 'Bài 8: Thấu kính',
        summary: `
           <p class="mb-4 text-gray-600">Thấu kính là một khối chất trong suốt giới hạn bởi hai mặt cong hoặc một mặt cong và một mặt phẳng.</p>
           
           <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
               <h6 class="font-bold text-teal-700 mb-2">Thấu kính hội tụ</h6>
               <ul class="text-sm space-y-1 text-gray-700 list-disc pl-4">
                 <li>Rìa mỏng, phần giữa dày.</li>
                 <li>Chùm tới song song $\\rightarrow$ chùm ló hội tụ.</li>
                 <li>Dùng làm kính lúp, kính lão.</li>
               </ul>
             </div>
             <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
               <h6 class="font-bold text-red-700 mb-2">Thấu kính phân kì</h6>
               <ul class="text-sm space-y-1 text-gray-700 list-disc pl-4">
                 <li>Rìa dày, phần giữa mỏng.</li>
                 <li>Chùm tới song song $\\rightarrow$ chùm ló phân kì.</li>
                 <li>Dùng làm kính cận.</li>
               </ul>
             </div>
           </div>
        `,
        formulas: [
            { label: 'Tiêu cự', latex: '$D = \\frac{1}{f}$' },
            { label: 'Thấu kính', latex: '$\\frac{1}{f} = \\frac{1}{d} + \\frac{1}{d\'}$' },
            { label: 'Độ phóng đại', latex: '$k = -\\frac{d\'}{d}$' }
        ],
        examples: [
          {
            id: 'ex-l8-1',
            title: 'Ví dụ 1: Xác định vị trí ảnh',
            content: 'Vật sáng AB đặt vuông góc với trục chính của thấu kính hội tụ có tiêu cự $f=20cm$, cách thấu kính $d=30cm$. Xác định vị trí của ảnh.',
            solution: `
              <p>Áp dụng công thức thấu kính:</p>
              <p>$\\frac{1}{f} = \\frac{1}{d} + \\frac{1}{d'}$</p>
              <p>Thay số:</p>
              <p>$\\frac{1}{20} = \\frac{1}{30} + \\frac{1}{d'}$</p>
              <p>$\\Rightarrow \\frac{1}{d'} = \\frac{1}{20} - \\frac{1}{30} = \\frac{3-2}{60} = \\frac{1}{60}$</p>
              <p>$\\Rightarrow d' = 60\\text{ (cm)}$</p>
              <p><strong>Kết luận:</strong> Ảnh thật, cách thấu kính 60cm.</p>
            `
          }
        ],
        exercises: [
            {
                id: 'e8-1',
                question: 'Một vật đặt cách thấu kính phân kì 20cm, tiêu cự thấu kính là 20cm. Ảnh nằm ở đâu?',
                solution: 'TK phân kì có $f = -20$.<br>$\\frac{1}{-20} = \\frac{1}{20} + \\frac{1}{d\'} \\Rightarrow \\frac{1}{d\'} = -\\frac{1}{20} - \\frac{1}{20} = -\\frac{1}{10} \\Rightarrow d\' = -10\\text{cm}$. Ảnh ảo cách TK 10cm.'
            }
        ]
      }
    ]
  },
  {
      id: 'c3',
      title: 'Chương III: Điện',
      lessons: [
          {
              id: 'l11',
              title: 'Bài 11: Điện trở. Định luật Ohm',
              summary: `
               <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-microchip text-purple-600 mr-2"></i>Điện trở</h4>
               <p class="mb-2">Đại lượng đặc trưng cho tính cản trở dòng điện của vật dẫn.</p>
               
               <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-clipboard-check text-purple-600 mr-2"></i>Định luật Ohm</h4>
               <p class="mb-2 italic text-gray-600">"Cường độ dòng điện chạy qua dây dẫn tỉ lệ thuận với hiệu điện thế đặt vào hai đầu dây và tỉ lệ nghịch với điện trở của dây."</p>
              `,
              formulas: [
                { label: 'Định luật Ohm', latex: '$I = \\frac{U}{R}$' },
                { label: 'Điện trở dây', latex: '$R = \\rho \\frac{l}{S}$' }
              ],
              examples: [
                 {
                   id: 'ex-l11-1',
                   title: 'Ví dụ 1: Tính cường độ dòng điện',
                   content: 'Một điện trở $R = 10\\Omega$ được mắc vào hiệu điện thế $U = 12V$. Tính cường độ dòng điện chạy qua điện trở.',
                   solution: `
                     <p>Áp dụng định luật Ohm:</p>
                     <p>$I = \\frac{U}{R} = \\frac{12}{10} = 1.2\\text{ (A)}$</p>
                   `
                 }
              ],
              exercises: [
                  {
                      id: 'e11-1',
                      question: 'Cần đặt một hiệu điện thế bao nhiêu vào hai đầu điện trở 50Ω để có dòng điện 0.2A chạy qua?',
                      solution: '$U = I \\cdot R = 0.2 \\cdot 50 = 10\\text{ (V)}$.'
                  }
              ]
          }
      ]
  },
  {
      id: 'c9',
      title: 'Chương IX: Lipid. Carbohydrate. Protein. Polymer',
      lessons: [
          {
              id: 'l28',
              title: 'Bài 28: Lipid',
              summary: `
              <p>Lipid là nguồn cung cấp và dự trữ năng lượng lớn cho cơ thể.</p>
              <div class="flex gap-2 my-4">
                 <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Chất béo</span>
                 <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Sáp</span>
                 <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Steroid</span>
              </div>
              <p><strong>Tính chất vật lí:</strong> Nhẹ hơn nước, không tan trong nước, tan trong dung môi hữu cơ.</p>
              `,
              exercises: [
                  {
                      id: 'e28-1',
                      question: 'Tại sao dầu ăn nổi trên mặt nước?',
                      solution: 'Vì dầu ăn là một loại chất béo (Lipid), có khối lượng riêng nhỏ hơn nước và không tan trong nước.'
                  }
              ]
          },
          {
              id: 'l29',
              title: 'Bài 29: Carbohydrate',
              summary: `
              <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-candy-cane text-pink-500 mr-2"></i>Glucose ($C_6H_{12}O_6$)</h4>
              <p class="mb-2">Là đường đơn quan trọng nhất, cung cấp năng lượng cho tế bào.</p>
              
              <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-cubes text-pink-500 mr-2"></i>Saccharose ($C_{12}H_{22}O_{11}$)</h4>
              <p class="mb-2">Là loại đường đôi phổ biến (đường mía).</p>
              `,
              formulas: [
                { label: 'Glucose', latex: '$C_6H_{12}O_6$' },
                { label: 'Saccharose', latex: '$C_{12}H_{22}O_{11}$' }
              ],
              examples: [
                 {
                   id: 'ex-l29-1',
                   title: 'Ví dụ 1: Phản ứng tráng gương',
                   content: 'Viết phương trình hóa học (dạng sơ đồ) chứng minh Glucose có tính chất của aldehyde.',
                   solution: `
                     <p>Glucose tác dụng với dung dịch $AgNO_3$ trong $NH_3$ đun nóng tạo ra kết tủa bạc ($Ag$).</p>
                     <p>Phương trình sơ đồ:</p>
                     <p>$C_6H_{12}O_6 + Ag_2O \\xrightarrow{NH_3, t^o} C_6H_{12}O_7 + 2Ag \\downarrow$</p>
                   `
                 }
              ],
              exercises: [
                  {
                      id: 'e29-1',
                      question: 'Trong máu người, nồng độ glucose ổn định ở mức bao nhiêu?',
                      solution: 'Khoảng 0.1%.'
                  }
              ]
          }
      ]
  }
];