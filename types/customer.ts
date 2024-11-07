// Interface สำหรับข้อมูลลูกค้า
export interface ICustomer {
    cust_id: number;
    cust_name: string;
    cust_address: string;
    contact_phone: string;
    contact_gps: string;
}

export const defaultCustomer: ICustomer = {
    cust_id: 0,
    cust_name: '',
    cust_address: '',
    contact_phone: '',
    contact_gps: ''
}

// Interface สำหรับข้อมูลเอทานอล
export interface IEthanol {
    type: string;      // ชนิดของเอทานอล
    ingredient: string; // ส่วนผสม
    use: string;       // การใช้งาน
}

// ค่าเริ่มต้นสำหรับ IEthanol
export const defaultEthanol: IEthanol = {
    type: '',
    ingredient: '',
    use: ''
}
// Interface สำหรับข้อมูลรถบรรทุกขนส่งเอทานอล
export interface ITruck {
    vehicle_id: string;         // รหัสรถบรรทุก
    license_plate: string;      // หมายเลขทะเบียนรถ
    capacity_liters: number;    // ความจุของรถ (ลิตร)
    current_location: {
        latitude: number;       // ละติจูด
        longitude: number;      // ลองจิจูด
    };
    status: string;             // สถานะของรถ (เช่น Available, Inactive)
    last_service_date: string;  // วันที่บริการล่าสุด
    fuel_type: string;          // ประเภทเชื้อเพลิง
    driver: {
        driver_id: string;      // รหัสคนขับ
        name: string;           // ชื่อคนขับ
        contact_phone: string;  // โทรศัพท์ติดต่อ
        license_number: string;  // หมายเลขใบอนุญาต
    };
    ethanol_transport_history: Array<{
        load_date: string;      // วันที่บรรทุก
        delivery_location: string; // สถานที่ส่ง
        amount_delivered: number; // ปริมาณที่ส่ง
    }>;
}

// ค่าเริ่มต้นสำหรับ ITruck
export const defaultTruck: ITruck = {
    vehicle_id: '',
    license_plate: '',
    capacity_liters: 0,
    current_location: {
        latitude: 0,
        longitude: 0
    },
    status: 'Inactive',
    last_service_date: '',
    fuel_type: '',
    driver: {
        driver_id: '',
        name: '',
        contact_phone: '',
        license_number: ''
    },
    ethanol_transport_history: []
};


// Interface สำหรับราคาขายปลีกของเอทานอล
export interface IEthanolPrice {
    price_id: string;           // รหัสราคาขายปลีก
    type: string;               // ชนิดของเอทานอล
    retail_price: number;       // ราคาขายปลีก (ต่อ ลิตร)
    date: string;               // วันที่ตั้งราคา
}

// ค่าเริ่มต้นสำหรับ IEthanolPrice
export const defaultEthanolPrice: IEthanolPrice = {
    price_id: '',
    type: '',
    retail_price: 0,
    date: ''
}
// Interface สำหรับข้อมูลอัตราภาษี
export interface ITaxRate {
    tax_id: string;             // รหัสภาษี
    tax_name: string;           // ชื่อภาษี
    tax_rate: number;           // อัตราภาษี (เป็นเปอร์เซ็นต์)
    description: string;        // รายละเอียด
    effective_date: string;     // วันที่มีผลบังคับใช้
    expiration_date: string | null; // วันหมดอายุ (nullable)
}

// ค่าเริ่มต้นสำหรับ ITaxRate
export const defaultTaxRate: ITaxRate = {
    tax_id: '',
    tax_name: '',
    tax_rate: 0,
    description: '',
    effective_date: '',
    expiration_date: null
};

// Interface สำหรับข้อมูลบรรจุภัณฑ์
export interface IPackaging {
    package_id: string;           // รหัสบรรจุภัณฑ์
    package_type: string;         // ประเภทบรรจุภัณฑ์
    capacity_liters: number;      // ความจุ (ลิตร)
    material: string;             // วัสดุที่ใช้
    weight_kg: number;            // น้ำหนัก (กิโลกรัม)
    label: string;                // ป้าย
    date_manufactured: string;    // วันที่ผลิต
    expiration_date: string;      // วันหมดอายุ
    safety_standard: string;      // มาตรฐานความปลอดภัย
    description: string;          // รายละเอียด
}

// ค่าเริ่มต้นสำหรับ IPackaging
export const defaultPackaging: IPackaging = {
    package_id: '',
    package_type: '',
    capacity_liters: 0,
    material: '',
    weight_kg: 0,
    label: '',
    date_manufactured: '',
    expiration_date: '',
    safety_standard: '',
    description: ''
};

// Interface สำหรับข้อมูลเครื่องมือวัดอัตราการไหล
export interface IFlowMeter {
    flow_meter_id: string;              // รหัสเครื่องมือวัดอัตราการไหล
    meter_type: string;                  // ชนิดของเครื่องมือวัด
    manufacturer: string;                // ชื่อผู้ผลิต
    model: string;                       // รุ่นของเครื่องมือวัด
    measurement_range: string;           // ช่วงการวัด
    accuracy: string;                    // ความแม่นยำ
    installation_date: string;           // วันที่ติดตั้ง
    last_calibration_date: string;       // วันที่สอบเทียบล่าสุด
    next_calibration_due: string;        // วันที่สอบเทียบถัดไป
    status: string;                      // สถานะของเครื่องมือ
    description: string;                 // รายละเอียดของเครื่องมือ
}

// ค่าเริ่มต้นสำหรับ IFlowMeter
export const defaultFlowMeter: IFlowMeter = {
    flow_meter_id: '',
    meter_type: '',
    manufacturer: '',
    model: '',
    measurement_range: '',
    accuracy: '',
    installation_date: '',
    last_calibration_date: '',
    next_calibration_due: '',
    status: '',
    description: ''
};


// Interface สำหรับข้อมูลเครื่องมือวัดระดับการจัดเก็บเอทานอล (ATG)
export interface IAutomaticTankGauge {
    atg_id: string;                  // รหัสเฉพาะของเครื่องมือวัดระดับ
    model: string;                   // รุ่นของเครื่องมือวัดระดับ
    manufacturer: string;            // ชื่อผู้ผลิต
    installation_date: string;       // วันที่ติดตั้งเครื่องมือ
    last_calibration_date: string;   // วันที่สอบเทียบครั้งล่าสุด
    next_calibration_due: string;    // วันที่ครบกำหนดสอบเทียบครั้งถัดไป
    tank_capacity: string;           // ความจุของถัง (ลิตร)
    current_level: string;           // ระดับปัจจุบันของเอทานอลในถัง (ลิตร)
    status: string;                  // สถานะของเครื่องมือ (เช่น Active, Inactive)
    description: string;             // คำอธิบายเพิ่มเติมเกี่ยวกับเครื่องมือ
}

// ค่าเริ่มต้นสำหรับ IAutomaticTankGauge
export const defaultAutomaticTankGauge: IAutomaticTankGauge = {
    atg_id: '',
    model: '',
    manufacturer: '',
    installation_date: '',
    last_calibration_date: '',
    next_calibration_due: '',
    tank_capacity: '',
    current_level: '',
    status: 'Inactive',
    description: ''
}
