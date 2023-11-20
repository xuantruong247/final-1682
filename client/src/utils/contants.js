import path from "../utils/path.js"
import { BsShieldShaded, BsTruck, BsReplyAll } from "react-icons/bs";
import { FaTty } from "react-icons/fa";
import { AiOutlineGift, AiFillDashboard, AiOutlineUsergroupAdd } from "react-icons/ai"
import { RiBillFill, RiProductHuntFill } from 'react-icons/ri'
import { TbCategory, TbBrandCodesandbox, TbBrandBlogger } from "react-icons/tb";


export const dateOfYear = [
    {
        id: 1,
        startDays: "7",
        endDays: "2023-10-08",
        text: "01/10 To 07/10"
    },
    {
        id: 2,
        startDays: "7",
        endDays: "2023-10-15",
        text: "08/10 To 14/10"
    },
    {
        id: 3,
        startDays: "7",
        endDays: "2023-10-22",
        text: "15/10 To 21/10"
    },
    {
        id: 4,
        startDays: "7",
        endDays: "2023-10-29",
        text: "22/10 To 28/10"
    },
    {
        id: 5,
        startDays: "7",
        endDays: "2023-11-05",
        text: "29/10 To 04/11"
    },
    {
        id: 6,
        startDays: "7",
        endDays: "2023-11-11",
        text: "05/11 To 11/11"
    },
    {
        id: 7,
        startDays: "7",
        endDays: "2023-11-18",
        text: "12/11 To 18/11"
    },
    {
        id: 8,
        startDays: "7",
        endDays: "2023-11-26",
        text: "19/11 To 25/11"
    },
    {
        id: 9,
        startDays: "7",
        endDays: "2023-12-03",
        text: "26/11 To 02/12"
    },
    {
        id: 10,
        startDays: "7",
        endDays: "2023-12-10",
        text: "03/12 To 09/12"
    },
    {
        id: 11,
        startDays: "7",
        endDays: "2023-12-17",
        text: "10/12 To 16/12"
    },
    {
        id: 12,
        startDays: "7",
        endDays: "2023-12-24",
        text: "17/12 To 23/12"
    },
    {
        id: 13,
        startDays: "7",
        endDays: "2023-12-31",
        text: "24/12 To 30/12"
    },

]


export const sortByQuantity = [
    {
        id: 1,
        value: 'quantity-asc',
        text: 'Out of stock'

    },
    {
        id: 2,
        value: 'quantity-desc',
        text: 'Stocking'
    },
    {
        id: 3,
        value: 'sold-asc',
        text: 'Sell at least'

    },
    {
        id: 4,
        value: 'sold-desc',
        text: 'Best seller'
    },
]



export const navigation = [
    {
        id: 1,
        value: 'HOME',
        path: `/${path.HOME}`
    },
    {
        id: 2,
        value: 'PRODUCTS',
        path: `/${path.PRODUCTS}`
    },
    {
        id: 3,
        value: 'BLOG',
        path: `/${path.BLOG}`
    },
    {
        id: 4,
        value: 'CONTACT',
        path: `/${path.CONTACT}`
    }, {
        id: 5,
        value: 'FAQs',
        path: `/${path.FAQ}`
    }
]

export const ProductExtraInformation = [
    {
        id: 1,
        title: 'Guarantee',
        sub: 'Quanlity Checked',
        icon: <BsShieldShaded />
    },
    {
        id: 2,
        title: 'Free Shipping',
        sub: 'Free On All Cards',
        icon: <BsTruck />
    },
    {
        id: 3,
        title: 'Speacial Gift Cards',
        sub: 'Speacial Gift Cards',
        icon: <AiOutlineGift />
    },
    {
        id: 4,
        title: 'Free Return',
        sub: 'Within 7 Days',
        icon: <BsReplyAll />
    },
    {
        id: 5,
        title: 'Consultancy',
        sub: 'Lifetime 24/7/256',
        icon: <FaTty />
    },
]


export const productInfoTabs = [
    {
        id: 1,
        name: 'DESCRIPTION',
        content: `Năm phát hành: 2011
        Giới tính: Nữ
        Phong Cách: Hiện đại, trẻ trung, năng động, quyến rũ
        Gọi đặt hàng: 093127312983`
    },
    {
        id: 2,
        name: 'WARRANTY',
        content: `WARRANTY INFORMATION
        LIMITED WARRANTIES
        Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
        
        Frames Used In Upholstered and Leather Products
        Limited Lifetime Warranty
        A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`
    },
    {
        id: 3,
        name: 'DELIVERY',
        content: `PURCHASING & DELIVERY
        
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
    },
    {
        id: 4,
        name: 'PAYMENT',
        content: `PURCHASING & DELIVERY
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
    },
]


export const sorts = [
    {
        id: 1,
        value: 'sold',
        text: 'Best selling'
    },
    {
        id: 2,
        value: 'title-asc',
        text: 'Alphabetically, A-Z'
    },
    {
        id: 3,
        value: 'title-desc',
        text: 'Alphabetically, Z-A'
    },
    {
        id: 4,
        value: 'price-desc',
        text: 'Price, high to low'
    },
    {
        id: 5,
        value: 'price-asc',
        text: 'Price, low to high'
    },
]


export const voteOptions = [
    {
        id: 1,
        text: 'Terrible'
    },
    {
        id: 2,
        text: 'Bad'
    },
    {
        id: 3,
        text: 'Neutral'
    },
    {
        id: 4,
        text: 'Good'
    },
    {
        id: 5,
        text: 'Perfect'
    }

]




export const manageRoles = [
    {
        id: 1,
        text: "admin",
        value: "admin"
    },
    {
        id: 2,
        text: "user",
        value: "user"
    },
]

export const statusPayment = [
    {
        id: 1,
        text: "Succeed",
        value: "Succeed"
    }, {
        id: 2,
        text: "Cancelled",
        value: "Cancelled"
    }
]

export const statusOrder = [
    {
        id: 1,
        text: "Preparing the order",
        value: "Preparing the order"
    },
    {
        id: 2,
        text: "The order has been shipped",
        value: "The order has been shipped"
    },
    {
        id: 3,
        text: "The delivery person is delivering to you",
        value: "The delivery person is delivering to you"
    },
    {
        id: 4,
        text: "Received goods successfully",
        value: "Received goods successfully"
    },
    {
        id: 5,
        text: "Refunded",
        value: "Refunded"
    },
    {
        id: 6,
        text: "Processing",
        value: "Processing"
    },
    {
        id: 7,
        text: "Cancelled",
        value: "Cancelled"
    },
]

export const blockStatus = [
    {
        id: 1,
        text: "Blocked",
        value: true
    },
    {
        id: 2,
        text: "Active",
        value: false
    }
]

export const manageBrand = [
    {
        id: 1,
        text: "Dior",
        value: "Dior"
    },
    {
        id: 2,
        text: "Calvin Klein",
        value: "Calvin Klein"
    },
]

export const manageCategory = [
    {
        id: 1,
        text: "Perfume Men",
        value: "Perfume Men"
    },
    {
        id: 2,
        text: "Perfume Man",
        value: "Perfume Man"
    },
    {
        id: 3,
        text: "Perfume Kid",
        value: "Perfume Kid"
    },
    {
        id: 4,
        text: "Perfume Unisex",
        value: "Perfume Unisex"
    },
]



export const adminSidebar = [
    {
        id: 1,
        type: "SINGLE",
        text: "Dashboard",
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icon: <AiFillDashboard size={20} />
    },
    {
        id: 2,
        type: "SINGLE",
        text: "Manage User",
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: <AiOutlineUsergroupAdd size={20} />
    },
    {
        id: 3,
        type: "PARENT",
        text: "Manage Product",
        icon: <RiProductHuntFill size={20} />,
        subMenu: [
            {
                text: 'Create product',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`
            },
            {
                text: "Manage Products",
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`
            }
        ]
    },
    {
        id: 4,
        type: "PARENT",
        text: "Manage Category",
        icon: <TbCategory size={20} />,
        subMenu: [
            {
                text: 'Create Category',
                path: `/${path.ADMIN}/${path.CREATE_CATEGORY}`
            },
            {
                text: "Manage Category",
                path: `/${path.ADMIN}/${path.MANAGE_CATEGORY}`
            }
        ]
    },
    {
        id: 5,
        type: "PARENT",
        text: "Manage Brand",
        icon: <TbBrandCodesandbox size={20} />,
        subMenu: [
            {
                text: 'Create Brand',
                path: `/${path.ADMIN}/${path.CREATE_BRAND}`
            },
            {
                text: "Manage Brand",
                path: `/${path.ADMIN}/${path.MANAGE_BRAND}`
            }
        ]
    },
    {
        id: 6,
        type: "PARENT",
        text: "Manage Blog",
        icon: <TbBrandBlogger size={20} />,
        subMenu: [
            {
                text: 'Create Blog',
                path: `/${path.ADMIN}/${path.CREATE_BLOG}`
            },
            {
                text: "Manage Blog",
                path: `/${path.ADMIN}/${path.MANAGE_BLOG}`
            }
        ]
    },
    {
        id: 7,
        type: "SINGLE",
        text: "Manage Order",
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icon: <RiBillFill size={20} />
    },
]

export const memberSidebar = [
    {
        id: 1,
        type: "SINGLE",
        text: "Personal",
        path: `/${path.MEMBER}/${path.PERSONAL}`,
        icon: <AiFillDashboard size={20} />
    },
    {
        id: 2,
        type: "SINGLE",
        text: "My cart",
        path: `/${path.MEMBER}/${path.MY_CART}`,
        icon: <AiOutlineUsergroupAdd size={20} />
    },
    {
        id: 3,
        type: "SINGLE",
        text: "Buy histories",
        path: `/${path.MEMBER}/${path.HISTORY}`,
        icon: <AiOutlineUsergroupAdd size={20} />
    },
    {
        id: 2,
        type: "SINGLE",
        text: "Wishlist",
        path: `/${path.MEMBER}/${path.WISHLIST}`,
        icon: <AiOutlineUsergroupAdd size={20} />
    },


]

export const mapFAQs = [
    {
        id: 1,
        title: "1. Question",
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium culpa saepe possimus earum repellendus molestias, harum id minus veniam. Veritatis suscipit quos quas iure quidem nisi ea consectetur nobis error!
        Fugit quas quidem voluptates quibusdam cumque, officiis eos laborum atque maxime odit saepe doloribus nostrum vel accusantium iste culpa, molestiae sint minus aliquid rerum perspiciatis cum. Quas, iusto? Quo, tempora?
        Tenetur soluta quo illum nobis earum vel quae recusandae repellat ut sed sint veritatis explicabo assumenda reiciendis fugiat eveniet officiis, iste cumque non adipisci laborum neque! Fuga distinctio necessitatibus laborum.
        Ab asperiores veritatis dolores provident, repudiandae, ullam magni voluptatem excepturi, exercitationem et similique. Aspernatur quos pariatur corrupti harum doloremque enim eligendi vitae tempora voluptas, quibusdam sint dolorem deserunt modi repellat.
        Porro, non voluptatibus. Vel, temporibus! Minima rem temporibus distinctio iste omnis alias, porro fuga sequi praesentium ullam saepe iure. Odio cum ipsum labore nisi ab pariatur vitae quia harum minus!
        Fugiat molestiae ducimus incidunt quisquam accusantium eum, voluptate laboriosam nam, quibusdam odit iusto natus saepe perferendis. Esse in quae quo voluptate porro quos veniam. In vitae totam repudiandae similique nesciunt!
        Ratione ab ipsa voluptas veniam, maxime ipsam voluptates aliquam exercitationem aut nobis ut officiis quas ex ducimus nam magni vitae facilis odit sint porro ullam nemo sapiente. Repudiandae, nemo dolor?
        Neque quaerat ut a libero eligendi iure maiores, quibusdam veniam ullam odio error facere quos excepturi perspiciatis, sapiente repellendus, accusantium rem omnis autem nostrum soluta doloremque eum facilis illo? Ipsam?
        Veritatis reiciendis unde nam, amet, dolor labore eligendi totam nobis minima quis consequatur aut. Recusandae fugit molestias dolore perferendis ea, voluptatibus natus nam odio eos tempora quas laborum distinctio sapiente!
        Quidem, quae in illo inventore suscipit dolore mollitia aperiam amet. Rerum, aut. Inventore iusto hic suscipit et nesciunt omnis commodi, ducimus libero vero quisquam eius placeat voluptatum. Laudantium, quasi fugiat!`
    },
    {
        id: 2,
        title: "2. Question",
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium culpa saepe possimus earum repellendus molestias, harum id minus veniam. Veritatis suscipit quos quas iure quidem nisi ea consectetur nobis error!
        Fugit quas quidem voluptates quibusdam cumque, officiis eos laborum atque maxime odit saepe doloribus nostrum vel accusantium iste culpa, molestiae sint minus aliquid rerum perspiciatis cum. Quas, iusto? Quo, tempora?
        Tenetur soluta quo illum nobis earum vel quae recusandae repellat ut sed sint veritatis explicabo assumenda reiciendis fugiat eveniet officiis, iste cumque non adipisci laborum neque! Fuga distinctio necessitatibus laborum.
        Ab asperiores veritatis dolores provident, repudiandae, ullam magni voluptatem excepturi, exercitationem et similique. Aspernatur quos pariatur corrupti harum doloremque enim eligendi vitae tempora voluptas, quibusdam sint dolorem deserunt modi repellat.
        Porro, non voluptatibus. Vel, temporibus! Minima rem temporibus distinctio iste omnis alias, porro fuga sequi praesentium ullam saepe iure. Odio cum ipsum labore nisi ab pariatur vitae quia harum minus!
        Fugiat molestiae ducimus incidunt quisquam accusantium eum, voluptate laboriosam nam, quibusdam odit iusto natus saepe perferendis. Esse in quae quo voluptate porro quos veniam. In vitae totam repudiandae similique nesciunt!
        Ratione ab ipsa voluptas veniam, maxime ipsam voluptates aliquam exercitationem aut nobis ut officiis quas ex ducimus nam magni vitae facilis odit sint porro ullam nemo sapiente. Repudiandae, nemo dolor?
        Neque quaerat ut a libero eligendi iure maiores, quibusdam veniam ullam odio error facere quos excepturi perspiciatis, sapiente repellendus, accusantium rem omnis autem nostrum soluta doloremque eum facilis illo? Ipsam?
        Veritatis reiciendis unde nam, amet, dolor labore eligendi totam nobis minima quis consequatur aut. Recusandae fugit molestias dolore perferendis ea, voluptatibus natus nam odio eos tempora quas laborum distinctio sapiente!
        Quidem, quae in illo inventore suscipit dolore mollitia aperiam amet. Rerum, aut. Inventore iusto hic suscipit et nesciunt omnis commodi, ducimus libero vero quisquam eius placeat voluptatum. Laudantium, quasi fugiat!`
    },
    {
        id: 3,
        title: "3. Question",
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium culpa saepe possimus earum repellendus molestias, harum id minus veniam. Veritatis suscipit quos quas iure quidem nisi ea consectetur nobis error!
        Fugit quas quidem voluptates quibusdam cumque, officiis eos laborum atque maxime odit saepe doloribus nostrum vel accusantium iste culpa, molestiae sint minus aliquid rerum perspiciatis cum. Quas, iusto? Quo, tempora?
        Tenetur soluta quo illum nobis earum vel quae recusandae repellat ut sed sint veritatis explicabo assumenda reiciendis fugiat eveniet officiis, iste cumque non adipisci laborum neque! Fuga distinctio necessitatibus laborum.
        Ab asperiores veritatis dolores provident, repudiandae, ullam magni voluptatem excepturi, exercitationem et similique. Aspernatur quos pariatur corrupti harum doloremque enim eligendi vitae tempora voluptas, quibusdam sint dolorem deserunt modi repellat.
        Porro, non voluptatibus. Vel, temporibus! Minima rem temporibus distinctio iste omnis alias, porro fuga sequi praesentium ullam saepe iure. Odio cum ipsum labore nisi ab pariatur vitae quia harum minus!
        Fugiat molestiae ducimus incidunt quisquam accusantium eum, voluptate laboriosam nam, quibusdam odit iusto natus saepe perferendis. Esse in quae quo voluptate porro quos veniam. In vitae totam repudiandae similique nesciunt!
        Ratione ab ipsa voluptas veniam, maxime ipsam voluptates aliquam exercitationem aut nobis ut officiis quas ex ducimus nam magni vitae facilis odit sint porro ullam nemo sapiente. Repudiandae, nemo dolor?
        Neque quaerat ut a libero eligendi iure maiores, quibusdam veniam ullam odio error facere quos excepturi perspiciatis, sapiente repellendus, accusantium rem omnis autem nostrum soluta doloremque eum facilis illo? Ipsam?
        Veritatis reiciendis unde nam, amet, dolor labore eligendi totam nobis minima quis consequatur aut. Recusandae fugit molestias dolore perferendis ea, voluptatibus natus nam odio eos tempora quas laborum distinctio sapiente!
        Quidem, quae in illo inventore suscipit dolore mollitia aperiam amet. Rerum, aut. Inventore iusto hic suscipit et nesciunt omnis commodi, ducimus libero vero quisquam eius placeat voluptatum. Laudantium, quasi fugiat!`
    },
    {
        id: 4,
        title: "4. Question",
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium culpa saepe possimus earum repellendus molestias, harum id minus veniam. Veritatis suscipit quos quas iure quidem nisi ea consectetur nobis error!
        Fugit quas quidem voluptates quibusdam cumque, officiis eos laborum atque maxime odit saepe doloribus nostrum vel accusantium iste culpa, molestiae sint minus aliquid rerum perspiciatis cum. Quas, iusto? Quo, tempora?
        Tenetur soluta quo illum nobis earum vel quae recusandae repellat ut sed sint veritatis explicabo assumenda reiciendis fugiat eveniet officiis, iste cumque non adipisci laborum neque! Fuga distinctio necessitatibus laborum.
        Ab asperiores veritatis dolores provident, repudiandae, ullam magni voluptatem excepturi, exercitationem et similique. Aspernatur quos pariatur corrupti harum doloremque enim eligendi vitae tempora voluptas, quibusdam sint dolorem deserunt modi repellat.
        Porro, non voluptatibus. Vel, temporibus! Minima rem temporibus distinctio iste omnis alias, porro fuga sequi praesentium ullam saepe iure. Odio cum ipsum labore nisi ab pariatur vitae quia harum minus!
        Fugiat molestiae ducimus incidunt quisquam accusantium eum, voluptate laboriosam nam, quibusdam odit iusto natus saepe perferendis. Esse in quae quo voluptate porro quos veniam. In vitae totam repudiandae similique nesciunt!
        Ratione ab ipsa voluptas veniam, maxime ipsam voluptates aliquam exercitationem aut nobis ut officiis quas ex ducimus nam magni vitae facilis odit sint porro ullam nemo sapiente. Repudiandae, nemo dolor?
        Neque quaerat ut a libero eligendi iure maiores, quibusdam veniam ullam odio error facere quos excepturi perspiciatis, sapiente repellendus, accusantium rem omnis autem nostrum soluta doloremque eum facilis illo? Ipsam?
        Veritatis reiciendis unde nam, amet, dolor labore eligendi totam nobis minima quis consequatur aut. Recusandae fugit molestias dolore perferendis ea, voluptatibus natus nam odio eos tempora quas laborum distinctio sapiente!
        Quidem, quae in illo inventore suscipit dolore mollitia aperiam amet. Rerum, aut. Inventore iusto hic suscipit et nesciunt omnis commodi, ducimus libero vero quisquam eius placeat voluptatum. Laudantium, quasi fugiat!`
    },
    {
        id: 5,
        title: "5. Question",
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium culpa saepe possimus earum repellendus molestias, harum id minus veniam. Veritatis suscipit quos quas iure quidem nisi ea consectetur nobis error!
        Fugit quas quidem voluptates quibusdam cumque, officiis eos laborum atque maxime odit saepe doloribus nostrum vel accusantium iste culpa, molestiae sint minus aliquid rerum perspiciatis cum. Quas, iusto? Quo, tempora?
        Tenetur soluta quo illum nobis earum vel quae recusandae repellat ut sed sint veritatis explicabo assumenda reiciendis fugiat eveniet officiis, iste cumque non adipisci laborum neque! Fuga distinctio necessitatibus laborum.
        Ab asperiores veritatis dolores provident, repudiandae, ullam magni voluptatem excepturi, exercitationem et similique. Aspernatur quos pariatur corrupti harum doloremque enim eligendi vitae tempora voluptas, quibusdam sint dolorem deserunt modi repellat.
        Porro, non voluptatibus. Vel, temporibus! Minima rem temporibus distinctio iste omnis alias, porro fuga sequi praesentium ullam saepe iure. Odio cum ipsum labore nisi ab pariatur vitae quia harum minus!
        Fugiat molestiae ducimus incidunt quisquam accusantium eum, voluptate laboriosam nam, quibusdam odit iusto natus saepe perferendis. Esse in quae quo voluptate porro quos veniam. In vitae totam repudiandae similique nesciunt!
        Ratione ab ipsa voluptas veniam, maxime ipsam voluptates aliquam exercitationem aut nobis ut officiis quas ex ducimus nam magni vitae facilis odit sint porro ullam nemo sapiente. Repudiandae, nemo dolor?
        Neque quaerat ut a libero eligendi iure maiores, quibusdam veniam ullam odio error facere quos excepturi perspiciatis, sapiente repellendus, accusantium rem omnis autem nostrum soluta doloremque eum facilis illo? Ipsam?
        Veritatis reiciendis unde nam, amet, dolor labore eligendi totam nobis minima quis consequatur aut. Recusandae fugit molestias dolore perferendis ea, voluptatibus natus nam odio eos tempora quas laborum distinctio sapiente!
        Quidem, quae in illo inventore suscipit dolore mollitia aperiam amet. Rerum, aut. Inventore iusto hic suscipit et nesciunt omnis commodi, ducimus libero vero quisquam eius placeat voluptatum. Laudantium, quasi fugiat!`
    },
]
