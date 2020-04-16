<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Security;

class AccountController extends AbstractController
{

    /**
     * @Route("/account", name="account")
     */
    public function privatePage( Security $security ) : Response
    {
        $user = $security->getUser();
        $currentpage = 'account';

        return $this->render('registration/myaccount.html.twig', [
            'user' => $user,
            'currentpage' => $currentpage,
        ]);
    }


    /**
     * @Route("/account/delete", name="delete")
     */
    public function deleteUserAction(EntityManagerInterface $em,
                                     SessionInterface $session, TokenStorageInterface $tokenStorage)
    {
        $user = $this->getUser();

        $em->remove($user);
        $em->flush();

        $tokenStorage->setToken(null);
        $session->invalidate();

        $deleted = true;

        return $this->redirectToRoute('home', [
            'deletedaccount' => $deleted,
        ]);

    }

}


