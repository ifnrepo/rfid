<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class Page_model extends CI_Model   {
    public function cekdatafn($val){
        $id = 0;
        $sudahada = 0;
        $hasil = [];
        $this->db->where('rfid',$val);
        $cek = $this->db->get('tb_packfin');
        if($cek->num_rows() > 0){
            $data = $cek->row_array();
            $datarf = $this->db->get_where('tb_rfid',['rfid'=>$data['rfid']]);
            if($datarf->num_rows() > 0){
                $cekdatarf = $datarf->row_array();
                $id = $cekdatarf['id'];
                if($cekdatarf['sesifn']!=$this->session->userdata('sesifn')){
                    $sudahada = 1;
                }
            }else{
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
                $this->db->insert('tb_rfid',$field);
                $id = $this->db->insert_id();
            }
        }
        if($id > 0){
            $xhas = $this->db->get_where('tb_rfid',['id'=>$id])->row_array();
            $dis = $xhas['dis']==0 ? '' : ' dis '.$xhas['dis'];
            $adarf = $sudahada==1 ? ' SUDAH ADA PADA DATA OUT ' : 'BERHASIL INPUT';
            $nobale = ' Bale No. '.$xhas['nobale'];
            $hasil['isi'] =  $xhas['po'].'#'.trim($xhas['item']).$dis.$nobale.' ('.$xhas['gate_out'].')';
            $hasil['done'] = $adarf;
            $hasil['status'] = $sudahada==1 ? 'SA' : 'OK';
        }else{
            $hasil = [];
        }
        return $hasil;
    }

    public function cekdatain($val){
        $hasil = [];
        $id = 0;
        $sudahada = 0;
        $this->db->where('rfid',$val);
        $cek = $this->db->get('tb_rfid');
        if($cek->num_rows() > 0){
            $datacek = $cek->row_array();
            if($datacek['sesi_gf']!=null){
                $sudahada = 1;
                $id = $datacek['id'];
            }else{
                $currentDateTime = new DateTime('now');
                $data = [
                    'sesi_gf' => $this->session->userdata('sesigf'),
                    'gate_in' => $currentDateTime->format('Y-m-d H:i:s'),
                ];
                $this->db->where('id',$datacek['id']);
                $this->db->update('tb_rfid',$data);
                $id = $datacek['id'];
            }
        }
        if($id > 0){
            $xhas = $this->db->get_where('tb_rfid',['id'=>$id])->row_array();
            $dis = $xhas['dis']==0 ? '' : ' dis '.$xhas['dis'];
            $adarf = $sudahada==1 ? ' SUDAH DI INPUT ' : '';
            $nobale = ' Bale No. '.$xhas['nobale'];
            $hasil['isi'] =  $xhas['po'].'#'.trim($xhas['item']).$dis.$nobale.' ('.$xhas['gate_in'].')';
            $hasil['done'] = $adarf;
            $hasil['status'] = $sudahada==1 ? 'SA' : 'OK';
        }else{
            $hasil = [];
        }
        return $hasil;
    }
}