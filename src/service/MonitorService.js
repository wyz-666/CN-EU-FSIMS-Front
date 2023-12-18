export default class MonitorService {
    getUuniformDisinfectionRecord() {
        return fetch('data/cloth_record.json').then(res => res.json()).then(d => d.data);
    }
}