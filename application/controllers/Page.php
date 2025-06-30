<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Page extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        // $this->load->library('form_validation');
        // $this->load->library('session');
        // $this->load->model('userappsmodel');
        $this->load->model('page_model', 'pagemodel');
        // $this->load->model('helper_model', 'helpermodel');
        // if(get_cookie('bantuMasukMomois')=='YES'){
        //     $this->_loginwithcookie(get_cookie('usernameMasukMomois'),get_cookie('passwordMasukMomois'));
        // }
    }
	public function fn(){
		$footer['halaman'] = 'fn';
		$this->session->set_userdata('sesifn',time());
		$this->load->view('layouts/header');
		$this->load->view('infin.php');
		$this->load->view('layouts/footer',$footer);
	}
	public function gf(){
		$footer['halaman'] = 'gf';
		$this->session->set_userdata('sesigf',time());
		$this->load->view('layouts/header');
		$this->load->view('ingf.php');
		$this->load->view('layouts/footer',$footer);
	}
	public function box(){
		$footer['halaman'] = 'bx';
		$this->load->view('layouts/header');
		$this->load->view('outbox.php');
		$this->load->view('layouts/footer',$footer);
	}
	public function validateHandheld(){
		$data = $_POST['data'];
		$x=0;
		foreach($data as $dat=>$value){
			$hasil = $this->pagemodel->cekdatafn($value['value']);
			if(count($hasil)> 0 ){
				$data[$x]['value'] = $hasil['isi'];
				$data[$x]['status'] = $hasil['status'];
			}else{
				$data[$x]['value'] = $value['value'].' - (NOT FOUND)';
				$data[$x]['status'] = 'NG';
			}
			$x++;
		}
		echo json_encode($data);
	}
	public function validateingudang(){
		$data = $_POST['data'];
		$x=0;
		foreach($data as $dat=>$value){
			$hasil = $this->pagemodel->cekdatain($value['value']);
			if(count($hasil) > 0 ){
				$data[$x]['value'] = $hasil['isi'];
				$data[$x]['status'] = $hasil['status'];
			}else{
				$data[$x]['value'] = $value['value'].' - (NOT FOUND)';
				$data[$x]['status'] = 'NG';
			}
			$x++;
		}
		echo json_encode($data);
	}
}
