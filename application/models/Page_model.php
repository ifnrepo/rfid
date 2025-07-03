<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Page_model extends CI_Model
{
    public function cekdatafn($val)
    {
        $id = 0;
        $sudahada = 0;
        $hasil = [];
        $this->db->where('rfid', $val);
        $cek = $this->db->get('tb_packfin');
        if ($cek->num_rows() > 0) {
            $data = $cek->row_array();
            $datarf = $this->db->get_where('tb_rfid', ['rfid' => $data['rfid']]);
            if ($datarf->num_rows() > 0) {
                $cekdatarf = $datarf->row_array();
                $id = $cekdatarf['id'];
                if ($cekdatarf['sesifn'] != $this->session->userdata('sesifn')) {
                    $sudahada = 1;
                }
            } else {
                $currentDateTime = new DateTime('now');
                $field = [
                    'po' => $data['po'],
                    'item' => $data['item'],
                    'dis' => $data['dis'],
                    'nobale' => $data['nobale'],
                    'rfid' => $data['rfid'],
                    'gate_out' => $currentDateTime->format('Y-m-d H:i:s'),
                    'sesifn' => $this->session->userdata('sesifn'),
                ];
                $this->db->insert('tb_rfid', $field);
                $id = $this->db->insert_id();
            }
        }
        if ($id > 0) {
            $xhas = $this->db->get_where('tb_rfid', ['id' => $id])->row_array();
            $dis = $xhas['dis'] == 0 ? '' : ' dis ' . $xhas['dis'];
            $adarf = $sudahada == 1 ? ' SUDAH ADA PADA DATA OUT ' : 'BERHASIL INPUT';
            $nobale = ' Bale No. ' . $xhas['nobale'];
            $hasil['isi'] = $xhas['po'] . '#' . trim($xhas['item']) . $dis . $nobale . ' (' . $xhas['gate_out'] . ')';
            $hasil['done'] = $adarf;
            $hasil['status'] = $sudahada == 1 ? 'SA' : 'OK';
        } else {
            $hasil = [];
        }
        return $hasil;
    }

    public function cekDataIn($val)
    {
        $hasil = [];
        $id = 0;
        $sudahada = 0;
        $this->db->where('rfid', $val);
        $cek = $this->db->get('tb_rfid');
        if ($cek->num_rows() > 0) {
            $datacek = $cek->row_array();
            if ($datacek['sesi_gf'] != null & $datacek['gate_in'] != null) {
                $sudahada = 1;
                $id = $datacek['id'];
            } else {
                $currentDateTime = new DateTime('now');
                $data = [
                    'sesi_gf' => $this->session->userdata('sesigf'),
                    'gate_in' => $currentDateTime->format('Y-m-d H:i:s'),
                ];
                $this->db->where('id', $datacek['id']);
                $this->db->update('tb_rfid', $data);
                $id = $datacek['id'];
            }
        }
        if ($id > 0) {
            $xhas = $this->db->get_where('tb_rfid', ['id' => $id])->row_array();
            $dis = $xhas['dis'] == 0 ? '' : ' dis ' . $xhas['dis'];
            $adarf = $sudahada == 1 ? ' SUDAH DI INPUT ' : 'BERHASIL MASUK';
            $nobale = ' Bale No. ' . $xhas['nobale'];
            $hasil['isi'] = $xhas['po'] . '#' . trim($xhas['item']) . $dis . $nobale . ' (' . $xhas['gate_in'] . ')';
            $hasil['done'] = $adarf;
            $hasil['status'] = $sudahada == 1 ? 'SA' : 'OK';
        } else {
            $hasil = [];
        }
        return $hasil;
    }
    public function getPlNo()
    {
        return $this->db
            ->distinct()
            ->select('plno')
            ->from('tb_balenumber')
            ->where('selesai', 0)       // only rows that are still pending
            ->group_by('plno')          // one row per PL-No
            ->order_by('plno', 'ASC')
            ->get()
            ->result_array();
    }

    public function getOrderByPlNo(string $plno): array
    {

        if ($plno == '') {
            return [];
        }
        return $this->db
            ->select('id, po, item, dis, nobale, masuk')
            ->from('tb_balenumber')
            ->where('plno', $plno)
            // ->where('selesai', 0)
            ->order_by('id', 'ASC')
            ->get()
            ->result_array();
    }

    public function getOrderByPlNoDone(string $plno): array
    {

        if ($plno == '') {
            return [];
        }
        return $this->db
            ->select('id, po, item, dis, nobale, masuk')
            ->from('tb_balenumber')
            ->where('plno', $plno)
            ->where('selesai', 1)
            ->order_by('id', 'ASC')
            ->get()
            ->result_array();
    }

    public function checkRFIDForBale(string $epc, string $plno): array
    {
        //mengecheck kalo misalnya ada di tabel rfid atw di gudang 
        $rfidData = $this->db
            ->where('rfid', $epc)
            ->get('tb_rfid')
            ->row_array();


        if (!$rfidData) {
            return [
                'isi' => $epc,
                'status' => 'SA',
                'done' => 'BELUM DI GUDANG'
            ];
        }

        $exists = $this->db
            ->where('plno', $plno)
            ->where('po', $rfidData['po'])
            ->where('item', $rfidData['item'])
            ->where('dis', $rfidData['dis'])
            ->where('nobale', $rfidData['nobale'])
            ->get('tb_balenumber')
            ->row_array();

        if (!$exists) {
            return [
                'isi' => "{$rfidData['po']}/{$rfidData['item']} Bale {$rfidData['nobale']}",
                'status' => 'NO',
                'done' => "TIDAK UNTUK PL {$plno}"
            ];
        }

        $this->db->where('po', $rfidData['po'])
            ->where('item', $rfidData['item'])
            ->where('dis', $rfidData['dis'])
            ->where('nobale', $rfidData['nobale'])
            ->update('tb_balenumber', [
                'masuk' => date('H:i:s'),
                'selesai' => 1
            ]);

        $label = sprintf(
            "%d. %s / %s Bale %d",
            $exists['id'],
            $exists['po'],
            $exists['item'],
            $exists['nobale'],
        );

        return [
            'isi' => $label,
            'status' => 'OK'
        ];
    }
}


